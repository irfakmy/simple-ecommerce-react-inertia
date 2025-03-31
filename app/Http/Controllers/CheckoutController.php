<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Midtrans\Snap;
use Midtrans\Config;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Product/Cart', [
            'items' => Order::with('items')->get()
        ]);
    }

    public function processCheckout(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|min:10',
            'customer_email' => 'required|email',
            'subtotal' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
            'order_items.*.product_variant_id' => 'nullable|exists:product_variants,id',
        ]);
    
        $order = Order::create([
            'user_id' => $request->user_id ?? null,
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'customer_email' => $request->customer_email,
            'subtotal' => $request->subtotal,
            'total_amount' => $request->total_amount,
            'shipment_status' => 'waiting',
            'payment_status' => 'pending',
        ]);
    
        $items = [];
        foreach ($request->order_items as $product) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product['product_id'],
                'product_variant_id' => $product['product_variant_id'] ?? null,
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
    
            $items[] = [
                'id' => $product['product_id'],
                'price' => $product['price'],
                'quantity' => $product['quantity'],
                'name' => 'Produk',
            ];
        }
    
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;
    
        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->total_amount,
            ],
            'customer_details' => [
                'first_name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_phone,
            ],
            'item_details' => $items,
            
            'callbacks' => [
                'finish_redirect_url' => url("/order-status/{$order->id}") // Redirect setelah sukses
            ]
        ];
    
        try {
            $snapToken = Snap::getSnapToken($params);
            $order->update(['snap_token' => $snapToken]);
    
            return Inertia::location("https://app.sandbox.midtrans.com/snap/v2/vtweb/{$snapToken}");
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            return Inertia::render('Product/Cart', [
                'error' => 'Failed to create payment session'
            ]);
        }
    }
    

    public function handleNotification(Request $request)
{
    Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);

    $notification = $request->all();
    Log::info('Midtrans Notification:', $notification);

    $orderId = $notification['order_id'] ?? null;
    $transactionStatus = $notification['transaction_status'] ?? null;
    $fraudStatus = $notification['fraud_status'] ?? null;

    if (!$orderId) {
        return response()->json(['message' => 'Order ID not found'], 400);
    }

    $order = Order::find($orderId);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    if ($transactionStatus == 'capture') {
        if ($fraudStatus == 'accept') {
            $order->update(['payment_status' => 'paid']);
        }
    } elseif ($transactionStatus == 'settlement') {
        $order->update(['payment_status' => 'paid']);
    } elseif ($transactionStatus == 'pending') {
        $order->update(['payment_status' => 'pending']);
    } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel' || $transactionStatus == 'expire') {
        $order->update(['payment_status' => 'failed']);
    } elseif ($transactionStatus == 'refund') {
        $order->update(['payment_status' => 'refunded']);
    }

    return response()->json(['message' => 'Notification processed successfully']);
}

}
