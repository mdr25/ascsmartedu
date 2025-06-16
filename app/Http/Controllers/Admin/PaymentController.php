<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['user', 'class.jenjangKelas'])->get();
        return response()->json($payments);
    }
    
    public function show($id)
    {
        $payment = Payment::with(['user', 'class'])->find($id);

        if (!$payment) {
            return response()->json(['message' => 'Pembayaran tidak ditemukan'], 404);
        }

        return response()->json($payment);
    }

    public function verify(Request $request, $id)
{
    $payment = Payment::findOrFail($id);

    if ($payment->status === 'paid') {
        return response()->json(['message' => 'Pembayaran sudah diverifikasi'], 400);
    }

    $payment->status = 'paid';
    $payment->payment_date = now();
    $payment->save();

    return response()->json(['message' => 'Pembayaran berhasil diverifikasi']);
}

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Pembayaran tidak ditemukan'], 404);
        }

        $payment->delete();

        return response()->json(['message' => 'Pembayaran berhasil dihapus']);
    }
}
