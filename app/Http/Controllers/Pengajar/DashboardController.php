<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Schedule;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Kelas yang diajar (pivot class_teacher)
        $classIds = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->pluck('class_id')
            ->toArray();

        // Jumlah kelas yang diajar
        $totalClasses = count($classIds);

        // Jumlah siswa unik dari semua kelas yang diajar
        $totalStudents = DB::table('class_user')
            ->whereIn('class_id', $classIds)
            ->distinct('user_id')
            ->count('user_id');

        // Jadwal hari ini dari semua kelas yang diajar
        $today = Carbon::today()->toDateString();
        $todaySchedule = Schedule::whereIn('classes_id', $classIds)
            ->where('date_sched', $today)
            ->get(['classes_id', 'course_name', 'start_time', 'end_time']);

        return response()->json([
            'name' => $user->name,
            'total_classes' => $totalClasses,
            'total_students' => $totalStudents,
            'today_schedule' => $todaySchedule,
        ]);
    }
}
