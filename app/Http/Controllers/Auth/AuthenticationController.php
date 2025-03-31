<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        dd($request->all());
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        $throttleKey = 'login-attempts:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Terlalu banyak percobaan login. Coba lagi dalam beberapa menit.',
            ]);
        }
    
        if (!Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            dd(Auth::check());
            RateLimiter::hit($throttleKey, 60); // Blokir selama 60 detik setelah 5 percobaan gagal
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }
    
        RateLimiter::clear($throttleKey);
    
        $request->session()->regenerate();
    
        $user = Auth::user();
        
        if ($user->role === 'admin') {
            return redirect()->intended('/admin/dashboard');
        }
    
        return redirect()->intended('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
