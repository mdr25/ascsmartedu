<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    // Lihat semua jadwal
    public function index()
    {
        return response()->json(Schedule::with('class')->get());
    }

    // Buat jadwal baru (Admin/Guru)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date_sched' => 'required|date',
            'course_name' => 'required|string|max:45',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'classes_id' => 'required|exists:classes,id',
        ]);

        $schedule = Schedule::create($validatedData);

        return response()->json(['message' => 'Schedule Created', 'data' => $schedule]);
    }

    // Update jadwal (Admin/Guru)
    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }

        $validatedData = $request->validate([
            'date_sched' => 'date',
            'course_name' => 'string|max:45',
            'start_time' => 'date_format:H:i:s',
            'end_time' => 'date_format:H:i:s|after:start_time',
            'classes_id' => 'exists:classes,id',
        ]);

        $schedule->update($validatedData);

        return response()->json(['message' => 'Schedule Updated', 'data' => $schedule]);
    }

    // Hapus jadwal (Admin/Guru)
    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }

        $schedule->delete();
        return response()->json(['message' => 'Schedule Deleted']);
    }
}
