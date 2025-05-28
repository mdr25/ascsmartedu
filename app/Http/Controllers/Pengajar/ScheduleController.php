<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Attendance;

class ScheduleController extends Controller
{
    // List jadwal per kelas
    public function index($classId)
    {
        $user = Auth::user();

        // Validasi pengajar hanya bisa akses kelas yang diajar
        $isTeaching = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->where('class_id', $classId)
            ->exists();

        if (!$isTeaching) {
            return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        }

        $schedules = DB::table('schedules')
            ->where('classes_id', $classId)
            ->get();

        return response()->json($schedules);
    }

    // Buat jadwal baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date_sched' => 'required|date',
            'course_name' => 'required|string|max:45',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'classes_id' => 'required|exists:classes,id',
        ]);

        // (Opsional) Validasi pengajar hanya bisa buat jadwal di kelas yang diajar
        // $user = $request->user();
        // if (!$user->teachingClasses()->where('classes.id', $validated['classes_id'])->exists()) {
        //     return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        // }

        $user = Auth::user();
        $isTeaching = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->where('class_id', $validated['classes_id'])
            ->exists();

        if (!$isTeaching) {
            return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        }

        // Insert jadwal baru
        $scheduleId = DB::table('schedules')->insertGetId([
            'date_sched' => $validated['date_sched'],
            'course_name' => $validated['course_name'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'classes_id' => $validated['classes_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Ambil semua siswa di kelas ini dari pivot class_user
        $studentIds = DB::table('class_user')
            ->where('class_id', $validated['classes_id'])
            ->pluck('user_id')
            ->toArray();

        if (empty($studentIds)) {
            return response()->json(['message' => 'Belum ada siswa di kelas ini'], 400);
        }

        // Insert absensi default (Alfa) untuk semua siswa
        $absensiData = [];
        foreach ($studentIds as $studentId) {
            $absensiData[] = [
                'users_id' => $studentId,
                'classes_id' => $validated['classes_id'],
                'schedule_id' => $scheduleId,
                'date' => $validated['date_sched'],
                'status' => 'Alfa',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('attendance')->insert($absensiData);

        return response()->json([
            'message' => 'Jadwal berhasil dibuat dan absensi otomatis ditambahkan',
            'schedule_id' => $scheduleId
        ], 201);
    }
}
