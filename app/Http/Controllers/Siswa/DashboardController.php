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

        // Info kelas
        $class = $user->kelas;

        // Jadwal hari ini
        $todaySchedule = Schedule::where('classes_id', $class?->id)
            ->where('date_sched', $today)
            ->select('course_name', 'start_time', 'end_time')
            ->get();

        // Status langganan
        $subscription = $user->subscription;
        $subscriptionStatus = [
            'active' => $user->hasActiveSubscription(),
            'package_name' => $subscription?->name,
            'expires_in_days' => optional($subscription)->duration, // asumsi ini fixed duration
        ];

        // Total konten belajar
        $totalKonten = Konten::where(function ($query) use ($user) {
            $query->where('is_free', true)
                ->orWhereHas('bab.mapel.classes', function ($q) use ($user) {
                    $q->where('id', $user->classes_id);
                });
        })->count();

        // Riwayat absensi 3 hari terakhir
        $recentAttendance = Attendance::where('users_id', $user->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get(['date', 'status']);

        return response()->json([
            'name' => $user->name,
            'class' => $class ? ['id' => $class->id, 'class_name' => $class->class_name] : null,
            'today_schedule' => $todaySchedule,
            'subscription' => $subscriptionStatus,
            'total_konten' => $totalKonten,
            'recent_attendance' => $recentAttendance
        ]);
    }
}
