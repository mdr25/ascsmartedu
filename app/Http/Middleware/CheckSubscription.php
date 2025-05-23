<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Payment;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        $latestPayment = Payment::where('users_id', $user->id)
            ->where('status', 'paid')
            ->orderByDesc('paid_until') // pastikan kamu punya kolom ini
            ->first();

        if (!$latestPayment || now()->greaterThan($latestPayment->paid_until)) {
            return redirect()->route('payment.form')->with('error', 'Langganan Anda telah berakhir. Silakan perpanjang untuk mengakses fitur ini.');
        }

        return $next($request);
    }
}
