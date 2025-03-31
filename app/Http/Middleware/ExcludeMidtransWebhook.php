<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ExcludeMidtransWebhook
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('midtrans/webhook')) {
            return $next($request);
        }

        return $next($request);
    }
}
