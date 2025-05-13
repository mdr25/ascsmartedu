<?php

namespace App\Http\Controllers\Api;

use App\Models\Schedule;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    // ✅ Ambil semua jadwal
    public function index()
    {
        $schedules = Schedule::with('classModel')->get();

        return response()->json([
            'message' => 'Daftar jadwal ditemukan.',
            'data'    => $schedules
        ], 200);
    }

    // ✅ Method jadwal khusus siswa login (autentikasi)
    public function schedulesForAuthenticatedStudent()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi.'
            ], 401);
        }

        // Ambil ID kelas yang dibayar user
        $classIds = Payment::where('users_id', $user->id)
            ->where('status', 'paid')
            ->pluck('classes_id');

        if ($classIds->isEmpty()) {
            return response()->json([
                'message' => 'Siswa belum memiliki kelas yang diakses.',
                'data'    => []
            ], 200);
        }

        // Ambil jadwal untuk kelas-kelas tersebut
        $schedules = Schedule::whereIn('classes_id', $classIds)
            ->with('classModel')
            ->get();

        return response()->json([
            'message' => 'Jadwal untuk kelas siswa berhasil diambil.',
            'data'    => $schedules
        ], 200);
    } 
    

    // ✅ Tambah jadwal
    public function store(Request $request)
    {
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

    // ✅ Perbarui jadwal
    public function update(Request $request, $id)
    {
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

    // ✅ Hapus jadwal
    public function destroy($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Jadwal tidak ditemukan.'], 404);
        }

        $schedule->delete();

        return response()->json(['message' => 'Jadwal berhasil dihapus.'], 200);
    }

}
