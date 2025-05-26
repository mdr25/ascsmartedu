<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\SubscriptionPackage;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof' => 'required|string|max:255',
        ]);

        $package = SubscriptionPackage::where('price', 250000)->first();

        if (!$package) {
            return response()->json(['error' => 'Paket tidak ditemukan.'], 404);
        }

        $payment = Payment::create([
            'users_id' => $request->user()->id,
            'subscription_id' => $package->id,
            'total_amount' => $package->price,
            'payment_method' => $validated['payment_method'],
            'payment_proof' => $validated['payment_proof'],
            'status' => 'unpaid',
        ]);

        return response()->json(['message' => 'Pembayaran dikirim', 'payment' => $payment]);
    }

    public function history(Request $request)
    {
        $payments = $request->user()->payments()->with('subscription')->get();
        return response()->json($payments);
    }
}
