<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // Lihat semua kehadiran
    public function index()
    {
        return response()->json(Attendance::with('class')->get());
    }

    // Catat kehadiran siswa (Guru)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'status' => 'required|in:Hadir,Izin,Sakit,Alfa',
            'classes_id' => 'required|exists:classes,id',
        ]);

        $attendance = Attendance::create($validatedData);

        return response()->json(['message' => 'Attendance Recorded', 'data' => $attendance]);
    }

    // Update kehadiran siswa (Guru)
    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $validatedData = $request->validate([
            'status' => 'required|in:Hadir,Izin,Sakit,Alfa',
        ]);

        $attendance->update($validatedData);

        return response()->json(['message' => 'Attendance Updated', 'data' => $attendance]);
    }

    // Hapus kehadiran (Admin/Guru)
    public function destroy($id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();
        return response()->json(['message' => 'Attendance Deleted']);
    }
}
