<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Midtrans\Config;

class MidtransServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */

     public function boot()
     {
         Config::$serverKey = env('MIDTRANS_SERVER_KEY');
         Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
         Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
         Config::$isSanitized = true;
         Config::$is3ds = true;
     }
}
