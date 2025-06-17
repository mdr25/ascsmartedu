<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Schedule;
use App\Models\ClassModel;
use App\Models\Attendance;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // $classIds = DB::table('class_teacher')
        //     ->where('teacher_id', $user->id)
        //     ->pluck('class_id');

        $classIds = ClassModel::where('teacher_id', $user->id)->pluck('id');


        // Ambil kelas dengan relasi & count siswa
        $classes = ClassModel::whereIn('id', $classIds)
            ->with(['jenjangKelas'])
            ->withCount('students')
            ->get()
            ->map(fn($class) => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'description' => $class->description ?? '-',
                'jenjang_kelas' => $class->jenjangKelas?->nama_jenjang ?? 'Tidak tersedia',
                'total_student' => $class->students_count
            ]);

        $today = Carbon::today()->toDateString();

        $todaySchedule = Schedule::whereIn('classes_id', $classIds)
            ->where('date_sched', $today)
            ->select('classes_id', 'course_name', 'start_time', 'end_time')
            ->get();

        $recentAttendance = Attendance::whereIn('classes_id', $classIds)
            ->with('user')
            ->orderBy('date', 'desc')
            ->take(10)
            ->get()
            ->groupBy('users_id')
            ->map(function ($items) {
                return $items->map(fn($att) => [
                    'name' => $att->user->name,
                    'date' => $att->date,
                    'status' => $att->status,
                    'class_id' => $att->classes_id
                ]);
            })
            ->values();


        return response()->json([
            'name' => $user->name,
            'classes' => $classes,
            'today_schedule' => $todaySchedule,
            'recent_attendance' => $recentAttendance
        ]);
    }

    // public function index()
    // {
    //     $user = Auth::user();

    //     // Kelas yang diajar (pivot class_teacher)
    //     $classIds = DB::table('class_teacher')
    //         ->where('teacher_id', $user->id)
    //         ->pluck('class_id')
    //         ->toArray();

    //     // Jumlah kelas yang diajar
    //     $totalClasses = count($classIds);

    //     // Jumlah siswa unik dari semua kelas yang diajar
    //     $totalStudents = DB::table('class_user')
    //         ->whereIn('class_id', $classIds)
    //         ->distinct('user_id')
    //         ->count('user_id');

    //     // Jadwal hari ini dari semua kelas yang diajar
    //     $today = Carbon::today()->toDateString();
    //     $todaySchedule = Schedule::whereIn('classes_id', $classIds)
    //         ->where('date_sched', $today)
    //         ->get(['classes_id', 'course_name', 'start_time', 'end_time']);

    //     return response()->json([
    //         'name' => $user->name,
    //         'total_classes' => $totalClasses,
    //         'total_students' => $totalStudents,
    //         'today_schedule' => $todaySchedule,
    //     ]);
    // }
}
