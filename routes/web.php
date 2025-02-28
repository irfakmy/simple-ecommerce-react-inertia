<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', [HomeController::class, 'index'])->name('landing.page');
Route::get('/store', [StoreController::class, 'index'])->name('index');
Route::get('/detail/{id}', [ProductController::class, 'show'])->name('product.show');
Route::get('/cart', [StoreController::class, 'cart'])->name('cart');
Route::post('/checkout', [CheckoutController::class, 'processCheckout'])->name('checkout');
Route::post('/midtrans/webhook', [CheckoutController::class, 'handleNotification']);
Route::get('/order-status', function (Request $request) {
    return Inertia::render('PaymentSuccess', [
        'order_id' => $request->query('order_id')
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
