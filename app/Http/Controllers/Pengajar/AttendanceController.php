<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'data' => 'required|array',
            'data.*.users_id' => 'required|exists:users,id',
            'data.*.status' => 'required|in:Hadir,Izin,Sakit,Alfa',
            'schedule_id' => 'nullable|exists:schedules,id',
        ]);

        $today = Carbon::now()->toDateString();

        foreach ($validated['data'] as $item) {
            Attendance::updateOrCreate([
                'users_id' => $item['users_id'],
                'classes_id' => $id,
                'date' => $today,
                'schedule_id' => $request->schedule_id,
            ], ['status' => $item['status']]);
        }

        return response()->json(['message' => 'Absensi berhasil ditambahkan']);
    }

    public function index(Request $request, $id)
    {
        $query = Attendance::with(['user', 'schedule'])->where('classes_id', $id);

        if ($request->has('date')) $query->where('date', $request->date);
        if ($request->has('schedule_id')) $query->where('schedule_id', $request->schedule_id);

        $data = $query->get();

        return $data->isEmpty()
            ? response()->json(['message' => 'Belum ada data absensi'], 404)
            : response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Hadir,Izin,Sakit,Alfa',
        ]);

        $absensi = Attendance::findOrFail($id);
        $absensi->update(['status' => $request->status]);

        return response()->json(['message' => 'Absensi berhasil diperbarui']);
    }
}
