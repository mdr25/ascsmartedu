<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Lihat semua pembayaran
    public function index()
    {
        return response()->json(Payment::with('user')->get());
    }

    // Buat pembayaran baru
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof' => 'required|string|max:255',
            'status' => 'required|in:paid,unpaid',
            'users_id' => 'required|exists:users,id',
        ]);

        $payment = Payment::create($validatedData);

        return response()->json(['message' => 'Payment Created', 'data' => $payment]);
    }

    // Update status pembayaran
    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $validatedData = $request->validate([
            'status' => 'required|in:paid,unpaid',
        ]);

        $payment->update($validatedData);

        return response()->json(['message' => 'Payment Updated', 'data' => $payment]);
    }
}
