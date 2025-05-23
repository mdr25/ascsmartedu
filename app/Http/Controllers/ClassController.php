<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassModel;
use App\Models\Schedule;
use App\Models\Attendance;
use Carbon\Carbon;

class ClassController extends Controller
{
    // Lihat semua kelas
    public function index(Request $request)
    {
        $jenjang = $request->query('jenjang');

        $classes = ClassModel::when($jenjang, function ($query) use ($jenjang) {
            return $query->where('jenjang_id', $jenjang);
        })->get();

        return response()->json($classes);
    }

    public function schedule($classId)
    {
        $schedule = Schedule::where('classes_id', $classId)->get();
        return response()->json($schedule);
    }

    public function attendance($classId, Request $request)
    {
        $user = $request->user();

        $attendances = Attendance::where('users_id', $user->id)
            ->whereHas('schedule', function ($q) use ($classId) {
                $q->where('classes_id', $classId);
            })->get();

        return response()->json($attendances);
    }

    public function updateAttendance($classId, $attendanceId, Request $request)
    {
        try {
            $user = $request->user();

            $attendance = Attendance::with('schedule')->where('id', $attendanceId)
                ->where('users_id', $user->id)
                ->where('classes_id', $classId)
                ->first();

            if (!$attendance) {
                return response()->json(['message' => 'Data absensi tidak ditemukan.'], 404);
            }

            $now = Carbon::now('Asia/Jakarta');

            // Ambil jadwalnya
            $schedule = $attendance->schedule;

            if (!$schedule) {
                return response()->json(['message' => 'Data jadwal tidak ditemukan.'], 404);
            }

            $scheduleDate = Carbon::parse($schedule->date_sched, 'Asia/Jakarta');

            // Cek dulu tanggalnya, harus sama dengan tanggal sekarang
            if (!$now->isSameDay($scheduleDate)) {
                return response()->json(['message' => 'Kamu hanya bisa absen di tanggal pelajaran.'], 403);
            }

            $startTime = Carbon::parse($schedule->start_time, 'Asia/Jakarta');
            $endTime = Carbon::parse($schedule->end_time, 'Asia/Jakarta');

            // Cek jam absen
            if (!$now->between($startTime, $endTime)) {
                return response()->json(['message' => 'Kamu hanya bisa absen pada jam pelajaran.'], 403);
            }

            // Status sebelumnya boleh Alfa/Izin/Sakit, baru bisa update ke Hadir
            if ($attendance->status === 'Hadir') {
                return response()->json(['message' => 'Kamu sudah absen sebagai Hadir.'], 400);
            }

            // Update status ke Hadir (atau ambil dari request kalau mau fleksibel)
            $attendance->update([
                'status' => 'Hadir'
            ]);

            return response()->json(['message' => 'Status absensi berhasil diupdate ke Hadir.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan.', 'error' => $e->getMessage()], 500);
        }
    }

    public function bankSoal($id)
    {
        // Bisa disesuaikan dengan model BankSoal jika ada
        return response()->json(['message' => "Fitur Bank Soal kelas ID $id belum tersedia."]);
    }
}
