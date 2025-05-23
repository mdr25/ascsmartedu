<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    // Buat form absensi (Admin/Pengajar)
    public function createForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'classes_id'  => 'required|exists:classes,id',
            'date'       => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time'   => 'required|date_format:H:i|after:start_time',
            'schedule_id'=> 'nullable|exists:schedules,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validasi gagal.', 'errors' => $validator->errors()], 422);
        }

        // Cek duplikasi form absensi per kelas dan tanggal
        $exists = AttendanceForm::where('classes_id', $request->classes_id)
            ->where('date', $request->date)
            ->first();

        if ($exists) {
            return response()->json(['message' => 'Form absensi untuk kelas dan tanggal ini sudah ada.'], 409);
        }

        $form = AttendanceForm::create([
            'classes_id' => $request->classes_id,
            'date'       => $request->date,
            'start_time' => $request->start_time,
            'end_time'   => $request->end_time,
            'schedule_id'=> $request->schedule_id,
        ]);

        return response()->json(['message' => 'Form absensi berhasil dibuat.', 'data' => $form], 201);
    }

    // Lihat daftar form absensi (Admin/Pengajar) dengan filter kelas optional
    public function indexForms(Request $request)
    {
        $query = AttendanceForm::with(['classModel', 'schedule'])->orderBy('date', 'desc');

        if ($request->has('classes_id')) {
            $query->where('classes_id', $request->classes_id);
        }

        $forms = $query->get();

        return response()->json(['message' => 'Daftar form absensi.', 'data' => $forms]);
    }

    // Lihat daftar form absensi (Siswa) sesuai kelasnya
    public function listForms(Request $request)
    {
        $user = Auth::user();

        $query = AttendanceForm::with(['classModel', 'schedule']);

        if ($user->classes_id) {
            $query->where('classes_id', $user->classes_id);
        }

        $forms = $query->orderBy('date', 'desc')->get();

        return response()->json(['message' => 'Daftar form absensi.', 'data' => $forms]);
    }

    // Detail form absensi dengan info lengkap
    public function showForm($id)
    {
        $form = AttendanceForm::with(['classModel', 'schedule', 'attendances.user'])->find($id);

        if (!$form) {
            return response()->json(['message' => 'Form absensi tidak ditemukan.'], 404);
        }

        return response()->json(['message' => 'Detail form absensi.', 'data' => $form]);
    }

    // Update form absensi (Admin/Pengajar)
    public function updateForm(Request $request, $id)
    {
        $form = AttendanceForm::find($id);

        if (!$form) {
            return response()->json(['message' => 'Form absensi tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'classes_id'  => 'required|exists:classes,id',
            'date'       => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time'   => 'required|date_format:H:i|after:start_time',
            'schedule_id'=> 'nullable|exists:schedules,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validasi gagal.', 'errors' => $validator->errors()], 422);
        }

        // Cek duplikasi selain dirinya sendiri
        $exists = AttendanceForm::where('classes_id', $request->classes_id)
            ->where('date', $request->date)
            ->where('id', '!=', $id)
            ->first();

        if ($exists) {
            return response()->json(['message' => 'Form absensi untuk kelas dan tanggal ini sudah ada.'], 409);
        }

        $form->update([
            'classes_id' => $request->classes_id,
            'date'       => $request->date,
            'start_time' => $request->start_time,
            'end_time'   => $request->end_time,
            'schedule_id'=> $request->schedule_id,
        ]);

        return response()->json(['message' => 'Form absensi berhasil diperbarui.', 'data' => $form]);
    }

    // Hapus form absensi (Admin/Pengajar)
    public function deleteForm($id)
    {
        $form = AttendanceForm::find($id);

        if (!$form) {
            return response()->json(['message' => 'Form absensi tidak ditemukan.'], 404);
        }

        $form->delete();

        return response()->json(['message' => 'Form absensi berhasil dihapus.']);
    }

    // Submit absensi oleh siswa dengan validasi waktu (harus sebelum end_time)
    public function submitAttendance(Request $request, $formId)
    {
        $user = Auth::user();

        $form = AttendanceForm::find($formId);

        if (!$form) {
            return response()->json(['message' => 'Form absensi tidak ditemukan.'], 404);
        }

        // Cek apakah user sesuai kelas form
        if ($user->classes_id != $form->classes_id) {
            return response()->json(['message' => 'Anda tidak berhak submit absensi untuk kelas ini.'], 403);
        }

        // Validasi waktu absensi
        $currentTime = now()->format('H:i');
        if ($currentTime > $form->end_time) {
            return response()->json(['message' => 'Waktu absensi sudah berakhir.'], 403);
        }

        // Cek apakah user sudah submit sebelumnya
        $exists = Attendance::where('attendance_form_id', $formId)
            ->where('user_id', $user->id)
            ->first();

        if ($exists) {
            return response()->json(['message' => 'Anda sudah melakukan absensi pada form ini.'], 409);
        }

        $attendance = Attendance::create([
            'attendance_form_id' => $formId,
            'user_id'            => $user->id,
            'status'             => $request->status ?? 'Hadir', // misal status default hadir
        ]);

        return response()->json(['message' => 'Absensi berhasil disimpan.', 'data' => $attendance], 201);
    }

    // Melihat absensi yang sudah di-submit oleh user di form tertentu
    public function myAttendances(Request $request, $formId)
    {
        $user = Auth::user();

        $attendances = Attendance::with('user')
            ->where('attendance_form_id', $formId)
            ->where('user_id', $user->id)
            ->get();

        return response()->json(['message' => 'Data absensi Anda.', 'data' => $attendances]);
    }

    // Update status absensi (misal admin/pengajar)
    public function updateAttendance(Request $request, $attendanceId)
    {
        $attendance = Attendance::find($attendanceId);

        if (!$attendance) {
            return response()->json(['message' => 'Data absensi tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validasi gagal.', 'errors' => $validator->errors()], 422);
        }

        $attendance->update([
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Status absensi berhasil diperbarui.', 'data' => $attendance]);
    }

    // Hapus absensi
    public function deleteAttendance($attendanceId)
    {
        $attendance = Attendance::find($attendanceId);

        if (!$attendance) {
            return response()->json(['message' => 'Data absensi tidak ditemukan.'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Data absensi berhasil dihapus.']);
    }
}
