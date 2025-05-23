<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\SubscriptionPackage;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
                'payment_proof' => 'required|string|max:255',
            ]);

            $package = SubscriptionPackage::where('price', 250000)->first();

            if (!$package) {
                return response()->json(['error' => 'Subscription package not found'], 404);
            }

            $payment = Payment::create([
                'users_id' => $request->user()->id,
                'subscription_id' => $package->id,
                'total_amount' => $package->price,
                'payment_method' => $validatedData['payment_method'],
                'payment_proof' => $validatedData['payment_proof'],
                'status' => 'unpaid',
            ]);

            return response()->json(['message' => 'Payment submitted successfully', 'payment' => $payment]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function paymentHistory(Request $request)
    {
        $payments = $request->user()->payments()->with('subscription')->get();
        return response()->json($payments);
    }
}
