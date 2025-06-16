<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\ClassModel;

class PaymentController extends Controller
{
    /**
     * Menampilkan daftar kelas yang sudah dibayar oleh siswa.
     */
    public function myClasses(Request $request)
    {
        $user = $request->user();

        // Ambil semua pembayaran yang berstatus "paid" atau "verified"
        $classIds = $user->payments()
            ->whereIn('status', ['paid', 'verified'])
            ->pluck('class_id')
            ->unique();

        // Ambil data lengkap kelas yang sudah dibeli
        $classes = ClassModel::whereIn('id', $classIds)
            ->with([
                'jenjangKelas:id,nama_jenjang',
                'teacher:id,name',
            ])
            ->withCount('students')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Daftar kelas yang sudah dibeli',
            'data' => $classes,
        ]);
    }

    /**
     * Membuat pembayaran untuk sebuah kelas.
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $class = ClassModel::findOrFail($validated['class_id']);

        // Cek apakah siswa sudah membeli kelas ini
        $alreadyPurchased = $user->payments()
            ->where('class_id', $class->id)
            ->whereIn('status', ['paid', 'verified']) // status penting
            ->exists();

        if ($alreadyPurchased) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Kelas sudah aktif dan tidak bisa dibeli ulang.',
            ], 400);
        }

        // Simpan data pembayaran
        $payment = Payment::create([
            'user_id' => $user->id,
            'class_id' => $class->id,
            'total_amount' => $class->price,
            'payment_method' => $validated['payment_method'],
            'payment_proof' => $validated['payment_proof'],
            'status' => 'unpaid',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran berhasil dikirim',
            'data' => $payment,
        ], 201);
    }

    /**
     * Menampilkan riwayat pembayaran user.
     */
    public function history(Request $request)
    {
        $payments = $request->user()
            ->payments()
            ->with([
                'class:id,class_name,price',
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data riwayat pembayaran ditemukan',
            'data' => $payments,
        ]);
    }
}
