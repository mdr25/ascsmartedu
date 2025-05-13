<?php

namespace App\Http\Controllers\Api;

use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    // Menampilkan semua data kehadiran
    public function index()
    {
        $data = Attendance::with('classModel')->get();
        return response()->json([
            'message' => 'Data kehadiran ditemukan.',
            'data' => $data
        ], 200);
    }

    // Menambahkan data kehadiran
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date'        => 'required|date',
            'status'      => 'required|in:hadir,tidak_hadir,izin,sakit',
            'classes_id'  => 'required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $attendance = Attendance::create($request->all());

        return response()->json([
            'message' => 'Data kehadiran berhasil ditambahkan.',
            'data' => $attendance
        ], 201);
    }

    // Memperbarui data kehadiran
    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Data tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'date'        => 'sometimes|required|date',
            'status'      => 'sometimes|required|in:hadir,tidak_hadir,izin,sakit',
            'classes_id'  => 'sometimes|required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $attendance->update($request->all());

        return response()->json([
            'message' => 'Data kehadiran berhasil diperbarui.',
            'data' => $attendance
        ], 200);
    }

    // Menghapus data kehadiran
    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Data tidak ditemukan.'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Data kehadiran berhasil dihapus.'], 200);
    }
}
