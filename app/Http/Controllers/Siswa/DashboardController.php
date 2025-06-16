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
        $classes = $user->classes()
            ->with(['jenjangKelas', 'teacher']) // Biarkan Laravel mengambil data relasi
            ->withCount('students')
            ->get()
            ->map(fn($class) => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'description' => $class->description ?? '-',
                'jenjang_kelas' => $class->jenjangKelas?->nama_jenjang ?? 'Tidak tersedia',
                'teacher' => $class->teacher?->name ?? 'Belum ditentukan',
                'total_student' => $class->students_count
            ]);


        // Jadwal hari ini dari semua kelas yang dibeli
        $todaySchedule = Schedule::whereIn('classes_id', $classes->pluck('id'))
            ->where('date_sched', $today)
            ->select('classes_id', 'course_name', 'start_time', 'end_time')
            ->get();


        // Riwayat absensi 3 hari terakhir dari semua kelas
        $recentAttendance = Attendance::where('users_id', $user->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get(['date', 'status', 'classes_id']);

        return response()->json([
            'name' => $user->name,
            'classes' => $classes,
            'today_schedule' => $todaySchedule,
            'recent_attendance' => $recentAttendance
        ]);
    }
}
