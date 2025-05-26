<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\{Schedule, User, Attendance};
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date_sched' => 'required|date',
            'course_name' => 'required|string|max:45',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'classes_id' => 'required|exists:classes,id',
        ]);

        $schedule = Schedule::create($validated);

        $students = User::where('classes_id', $validated['classes_id'])
            ->whereHas('role', fn($q) => $q->where('name_role', 'Siswa'))
            ->get();

        if ($students->isEmpty()) {
            return response()->json(['message' => 'Belum ada siswa di kelas ini'], 400);
        }

        foreach ($students as $student) {
            Attendance::create([
                'users_id' => $student->id,
                'classes_id' => $validated['classes_id'],
                'schedule_id' => $schedule->id,
                'date' => $validated['date_sched'],
                'status' => 'Alfa'
            ]);
        }

        return response()->json([
            'message' => 'Jadwal berhasil dibuat dan absensi otomatis ditambahkan',
            'schedule' => $schedule
        ], 201);
    }
}
