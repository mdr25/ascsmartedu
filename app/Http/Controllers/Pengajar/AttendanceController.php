<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Schedule;
use App\Models\Attendance;
use App\Models\ClassModel;
use Carbon\Carbon;

class AttendanceController extends Controller
{

    public function attendanceRecap($scheduleId)
    {
        $schedule = Schedule::with(['class', 'class.jenjangKelas', 'attendance.user'])
            ->findOrFail($scheduleId);

        return response()->json([
            'schedule' => [
                'id' => $schedule->id,
                'class_name' => $schedule->class->class_name,
                'jenjang_kelas' => $schedule->class->jenjangKelas?->nama_jenjang ?? '-',
                'date_sched' => $schedule->date_sched,
                'course_name' => $schedule->course_name,
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time
            ],
            'attendance' => $schedule->attendance->map(fn($att) => [
                'name' => $att->user->name,
                'status' => $att->status,
                'date' => $att->date
            ])
        ]);
    }

    //  List absensi per kelas (bisa filter date/schedule_id)
    // public function index(Request $request, $id)
    // {
    //     /** @var \App\Models\User $user */
    //     $user = Auth::user();

    //     // Validasi pengajar hanya bisa akses kelas yang diajar
    //     $kelas = $user->teachingClasses()->where('classes.id', $id)->first();
    //     if (!$kelas) {
    //         return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
    //     }

    //     $query = Attendance::with(['user', 'schedule'])->where('classes_id', $id);

    //     if ($request->has('date')) $query->where('date', $request->date);
    //     if ($request->has('schedule_id')) $query->where('schedule_id', $request->schedule_id);

    //     $data = $query->get();

    //     return $data->isEmpty()
    //         ? response()->json(['message' => 'Belum ada data absensi'], 404)
    //         : response()->json($data);
    // }


    //  Tambah/update absensi siswa per kelas
    // public function store(Request $request, $id)
    // {
    //     /** @var \App\Models\User $user */
    //     $user = Auth::user();

    //     $kelas = $user->teachingClasses()->where('classes.id', $id)->first();
    //     if (!$kelas) {
    //         return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
    //     }

    //     $validated = $request->validate([
    //         'data' => 'required|array',
    //         'data.*.users_id' => 'required|exists:users,id',
    //         'data.*.status' => 'required|in:Hadir,Izin,Sakit,Alfa',
    //         'schedule_id' => 'nullable|exists:schedules,id',
    //     ]);

    //     $today = Carbon::now()->toDateString();

    //     foreach ($validated['data'] as $item) {
    //         Attendance::updateOrCreate([
    //             'users_id' => $item['users_id'],
    //             'classes_id' => $id,
    //             'date' => $today,
    //             'schedule_id' => $request->schedule_id,
    //         ], [
    //             'status' => $item['status'],
    //         ]);
    //     }

    //     return response()->json(['message' => 'Absensi berhasil ditambahkan']);
    // }


    //  Update status absensi siswa
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Hadir,Izin,Sakit,Alfa',
        ]);

        /** @var Attendance $absensi */
        $absensi = Attendance::findOrFail($id);
        $absensi->update(['status' => $request->status]);

        return response()->json(['message' => 'Absensi berhasil diperbarui']);
    }
}
