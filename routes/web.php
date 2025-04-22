<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\StoreController;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;

Route::get('/', [HomeController::class, 'index'])->name('landing.page');
Route::get('/store', [StoreController::class, 'index'])->name('index');
Route::get('/detail/{id}', [ProductController::class, 'show'])->name('product.show');
Route::get('/cart', [StoreController::class, 'cart'])->name('cart');
Route::post('/checkout', [CheckoutController::class, 'processCheckout'])->name('checkout');
Route::post('/midtrans/webhook', [CheckoutController::class, 'handleNotification']);
Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::get('/order-status', function (Request $request) {
    return Inertia::render('PaymentSuccess', [
        'order_id' => $request->query('order_id')
    ]);
});



Route::post('/logout', [AuthenticationController::class, 'logout'])->name('logout');
Route::get('/login', [AuthenticationController::class, 'showLogin']);
Route::post('/login', [AuthenticationController::class, 'login']);
