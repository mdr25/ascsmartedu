<?php

namespace App\Http\Controllers\Api;

use App\Models\Payment;
use App\Models\Classes;
use App\Models\User;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     */
    public function store(Request $request)
    {
       
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'price_id'       => 'required|exists:prices,id',
            'payment_date'   => 'required|date',
            'payment_method' => 'required|in:Transfer,Qris,Virtual Account',
            'payment_proof'  => 'required|string',
            'status'         => 'in:paid,unpaid',
            'classes_id'     => 'required|array|min:1',
            'classes_id.*'   => 'exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        if (is_null($user->jenjang_kelas_id)) {
            return response()->json([
                'message' => 'Gagal melakukan pembayaran. Siswa belum memilih jenjang kelas.',
            ], 403);
        }

        $invalidClasses = Classes::whereIn('id', $request->classes_id)
            ->where('jenjang_kelas_id', '!=', $user->jenjang_kelas_id)
            ->get();

        if ($invalidClasses->isNotEmpty()) {
            return response()->json([
                'message' => 'Gagal melakukan pembayaran. Salah satu kelas yang dipilih tidak sesuai dengan jenjang yang telah dipilih siswa.',
                'invalid_classes' => $invalidClasses->pluck('id')
            ], 422);
        }

        DB::beginTransaction();

        try {
            $expiredAt = Carbon::parse($request->payment_date)->addMonth();

            $payment = Payment::create([
                'price_id'        => $request->price_id,
                'payment_date'    => $request->payment_date,
                'expired_at'      => $expiredAt,
                'payment_method'  => $request->payment_method,
                'payment_proof'   => $request->payment_proof,
                'status'          => $request->status ?? 'unpaid',
                'users_id'        => $user->id,
            ]);

            foreach ($request->classes_id as $classId) {
                $payment->classes()->attach($classId, ['payments_users_id' => $user->id]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pembayaran berhasil disimpan.',
                'data'    => $payment->load(['classes', 'price'])
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
        $payments = Payment::with(['classes.jenjangKelas', 'price'])
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
        $payments = Payment::with(['classes.jenjangKelas', 'user', 'price'])
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
