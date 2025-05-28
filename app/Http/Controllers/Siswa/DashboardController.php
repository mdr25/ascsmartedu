<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Attendance;
use App\Models\Konten;
use App\Models\Schedule;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();
        $today = Carbon::today()->toDateString();

        // List kelas yang sudah dibeli user
        $classes = $user->classes()->get(['id', 'class_name']);

        // Jadwal hari ini dari semua kelas yang dibeli
        $todaySchedule = Schedule::whereIn('classes_id', $classes->pluck('id'))
            ->where('date_sched', $today)
            ->select('classes_id', 'course_name', 'start_time', 'end_time')
            ->get();

        // Total konten belajar dari semua kelas yang dibeli
        $classIds = $classes->pluck('id')->toArray();
        $totalKonten = Konten::whereHas('bab.mapel', function ($q) use ($classIds) {
            $q->whereIn('classes_id', $classIds);
        })->count();

        // Riwayat absensi 3 hari terakhir dari semua kelas
        $recentAttendance = Attendance::where('users_id', $user->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get(['date', 'status', 'classes_id']);

        return response()->json([
            'name' => $user->name,
            'classes' => $classes,
            'today_schedule' => $todaySchedule,
            'total_konten' => $totalKonten,
            'recent_attendance' => $recentAttendance
        ]);
    }
}
