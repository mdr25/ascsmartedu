<?php

namespace App\Http\Controllers\Api;

use App\Models\Schedule;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    // ✅ Ambil semua jadwal (hanya admin)
    public function index()
    {
        $user = Auth::user();
        if (!$user || $user->role->name_role !== 'admin') {
            return response()->json(['message' => 'Hanya admin yang dapat mengakses data ini.'], 403);
        }

        $schedules = Schedule::with('classModel')->get();

        if ($schedules->isEmpty()) {
            return response()->json([
                'message' => 'Daftar jadwal tidak ada.',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'message' => 'Daftar jadwal ditemukan.',
            'data'    => $schedules
        ], 200);
    }

    // ✅ Jadwal khusus siswa login
    public function schedulesForAuthenticatedStudent()
{
    $user = Auth::user();

    if (!$user || $user->role->name_role !== 'siswa') {
        return response()->json(['message' => 'Hanya siswa yang dapat mengakses jadwal ini.'], 403);
    }

    // Ambil semua pembayaran yang sudah dibayar
    $payments = Payment::with('classes')
        ->where('users_id', $user->id)
        ->where('status', 'paid')
        ->get();

    $classIds = $payments->flatMap(function ($payment) {
        return $payment->classes->pluck('id');
    })->unique();

    if ($classIds->isEmpty()) {
        return response()->json([
            'message' => 'Anda belum melakukan pembayaran kelas, akses jadwal ditolak.'
        ], 403);
    }

    $schedules = Schedule::whereIn('classes_id', $classIds)
        ->with('classModel')
        ->get();

    return response()->json([
        'message' => 'Jadwal kelas siswa berhasil diambil.',
        'data'    => $schedules
    ], 200);
}



    // ✅ Jadwal khusus pengajar login
    public function schedulesForTeacher()
    {
        $user = auth()->user();

        if (!$user || !$user->hasRole('pengajar')) {
            return response()->json(['message' => 'Hanya pengajar yang dapat mengakses jadwal ini.'], 403);
        }

        // Ambil ID kelas yang diajar pengajar (gunakan relasi taughtClasses)
        $classIds = $user->taughtClasses()->pluck('id');

        if ($classIds->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada kelas yang diajarkan.',
                'data'    => []
            ], 200);
        }

        $schedules = Schedule::whereIn('classes_id', $classIds)
            ->with('classModel')
            ->get();

        return response()->json([
            'message' => 'Jadwal untuk pengajar berhasil diambil.',
            'data'    => $schedules
        ], 200);
    }


    // ✅ Tambah jadwal (hanya admin)
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role->name_role !== 'admin') {
            return response()->json(['message' => 'Hanya admin yang dapat menambah jadwal.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'date_sched'   => 'required|date',
            'course_name'  => 'required|string|max:255',
            'start_time'   => 'required|date_format:H:i',
            'end_time'     => 'required|date_format:H:i|after:start_time',
            'classes_id'   => 'required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $schedule = Schedule::create($request->all());

        return response()->json([
            'message' => 'Jadwal berhasil ditambahkan.',
            'data'    => $schedule
        ], 201);
    }

    // ✅ Update jadwal (hanya admin)
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if (!$user || $user->role->name_role !== 'admin') {
            return response()->json(['message' => 'Hanya admin yang dapat memperbarui jadwal.'], 403);
        }

        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Jadwal tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'date_sched'   => 'sometimes|required|date',
            'course_name'  => 'sometimes|required|string|max:255',
            'start_time'   => 'sometimes|required|date_format:H:i',
            'end_time'     => 'sometimes|required|date_format:H:i|after:start_time',
            'classes_id'   => 'sometimes|required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $schedule->update($request->all());

        return response()->json([
            'message' => 'Jadwal berhasil diperbarui.',
            'data'    => $schedule
        ], 200);
    }

    // ✅ Hapus jadwal (hanya admin)
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user || $user->role->name_role !== 'admin') {
            return response()->json(['message' => 'Hanya admin yang dapat menghapus jadwal.'], 403);
        }

        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Jadwal tidak ditemukan.'], 404);
        }

        $schedule->delete();

        return response()->json(['message' => 'Jadwal berhasil dihapus.'], 200);
    }
}
