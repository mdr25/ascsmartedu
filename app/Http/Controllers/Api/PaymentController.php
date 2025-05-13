<?php

namespace App\Http\Controllers\Api;

use App\Models\Payment;
use App\Models\Classes;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    /**
     * Menyimpan pembayaran siswa
     */
public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total_amount'   => 'required|numeric|min:1000',
            'payment_date'   => 'required|date',
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof'  => 'required|string',
            'status'         => 'in:paid,unpaid',
            'users_id'       => 'required|exists:users,id',
            'classes_id'     => 'required|array|min:1',
            'classes_id.*'   => 'exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        // Ambil data user
        $user = User::find($request->users_id);

        // Cek apakah user sudah memilih jenjang kelas (tanpa relasi pivot)
        if (is_null($user->jenjang_kelas_id)) {
            return response()->json([
                'message' => 'Gagal melakukan pembayaran. Siswa belum memilih jenjang kelas.',
            ], 403);
        }

        DB::beginTransaction();

        try {
            // Simpan data pembayaran
            $payment = Payment::create([
                'total_amount'   => $request->total_amount,
                'payment_date'   => $request->payment_date,
                'payment_method' => $request->payment_method,
                'payment_proof'  => $request->payment_proof,
                'status'         => $request->status ?? 'unpaid',
                'users_id'       => $request->users_id,
            ]);

            // Kaitkan kelas dengan pembayaran
            foreach ($request->classes_id as $classId) {
                $payment->classes()->attach($classId, ['payments_users_id' => $request->users_id]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pembayaran berhasil disimpan.',
                'data'    => $payment->load(['classes'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan pembayaran.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Untuk siswa: Menampilkan pembayaran berdasarkan ID user
     */
    public function indexByUser($user_id)
    {
        $payments = Payment::with('classes.jenjangKelas')
            ->where('users_id', $user_id)
            ->get();

        if ($payments->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada data pembayaran ditemukan.',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'message' => 'Daftar pembayaran ditemukan.',
            'data'    => $payments
        ], 200);
    }

    /**
     * Untuk Admin: Menampilkan semua pembayaran semua siswa
     */
    public function indexForAdmin()
    {
        $payments = Payment::with(['classes.jenjangKelas', 'user']) // pastikan relasi user ada
            ->orderBy('payment_date', 'desc')
            ->get();

        if ($payments->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada data pembayaran ditemukan.',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'message' => 'Daftar seluruh pembayaran siswa ditemukan.',
            'data'    => $payments
        ], 200);
    }
}
