<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\ClassModel;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof' => 'required|string|max:255',
        ]);

        $class = ClassModel::findOrFail($validated['class_id']);
        $user = $request->user();

        // Cek apakah sudah pernah beli kelas ini
        if ($user->classes()->where('class_id', $class->id)->exists()) {
            return response()->json(['message' => 'Kelas sudah pernah dibeli'], 400);
        }

        $payment = Payment::create([
            'user_id' => $user->id,
            'class_id' => $class->id,
            'total_amount' => $class->price,
            'payment_method' => $validated['payment_method'],
            'payment_proof' => $validated['payment_proof'],
            'status' => 'unpaid',
        ]);

        return response()->json(['message' => 'Pembayaran dikirim', 'payment' => $payment]);
    }

    // History pembayaran kelas
    public function history(Request $request)
    {
        $payments = $request->user()->payments()->with('class')->get();
        return response()->json($payments);
    }
}
