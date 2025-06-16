<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $classes = $user->classes()->with([
            'jenjangKelas:id,nama_jenjang', // Tambahin ini supaya jenjang kelas ikut dikirim
            'schedules' => function ($query) {
                $query->with('attendance');
            }
        ])->get();

        return response()->json($classes);
    }

    public function update($classId, $attendanceId, Request $request)
    {
        $user = $request->user();
        $attendance = Attendance::with('schedule')
            ->where('id', $attendanceId)
            ->where('users_id', $user->id)
            ->first();

        if (!$attendance || $attendance->schedule->classes_id != $classId) {
            return response()->json(['message' => 'Absensi tidak ditemukan.'], 404);
        }

        $now = Carbon::now('Asia/Jakarta');
        $scheduleDate = Carbon::parse($attendance->schedule->date_sched, 'Asia/Jakarta');

        if (!$now->isSameDay($scheduleDate)) {
            return response()->json(['message' => 'Absen hanya bisa dilakukan di tanggal pelajaran.'], 403);
        }

        $startTime = Carbon::parse($attendance->schedule->start_time, 'Asia/Jakarta');
        $endTime = Carbon::parse($attendance->schedule->end_time, 'Asia/Jakarta');

        if (!$now->between($startTime, $endTime)) {
            return response()->json(['message' => 'Absen hanya bisa dilakukan pada jam pelajaran.'], 403);
        }

        if ($attendance->status === 'Hadir') {
            return response()->json(['message' => 'Kamu sudah absen.'], 400);
        }

        $attendance->update(['status' => 'Hadir']);

        return response()->json([
            'message' => 'Absen berhasil.',
            'attendance' => $attendance,
        ]);
    }

    public function history($classId, Request $request)
    {
        $user = $request->user();
        $attendance = Attendance::where('users_id', $user->id)
            ->where('classes_id', $classId)
            ->orderBy('date', 'desc')
            ->get();
        return response()->json($attendance);
    }
}
