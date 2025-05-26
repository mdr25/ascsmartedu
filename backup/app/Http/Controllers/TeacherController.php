<?php

namespace App\Http\Controllers;

use App\Models\{User, ClassModel, Attendance, BankSoal, Schedule};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class TeacherController extends Controller
{
    // GET /api/teacher/classes
    public function getClasses()
    {
        $teacher = Auth::user();

        $kelas = ClassModel::where('id', $teacher->classes_id)->first();

        if (!$kelas) {
            return response()->json(['message' => 'Pengajar tidak memiliki kelas'], 404);
        }

        return response()->json($kelas);
    }

    // GET /api/teacher/classes/{id}/students
    public function getStudentsInClass($id)
    {
        $students = User::where('classes_id', $id)->whereHas('role', function ($q) {
            $q->where('name_role', 'Siswa');
        })->get();

        return response()->json($students);
    }

    // POST /api/teacher/classes/{id}/attendance
    public function createAttendance(Request $request, $id)
    {
        try {
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
                    'schedule_id' => $request->schedule_id
                ], [
                    'status' => $item['status']
                ]);
            }

            return response()->json(['message' => 'Absensi berhasil ditambahkan']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }

    // GET /api/teacher/classes/{id}/attendances
    public function getAttendancesInClass(Request $request, $id)
    {
        $query = Attendance::with(['user', 'schedule'])
            ->where('classes_id', $id);

        // Optional filter by date
        if ($request->has('date')) {
            $query->where('date', $request->date);
        }

        // Optional filter by schedule_id
        if ($request->has('schedule_id')) {
            $query->where('schedule_id', $request->schedule_id);
        }

        $attendances = $query->get();

        if ($attendances->isEmpty()) {
            return response()->json(['message' => 'Belum ada data absensi'], 404);
        }

        return response()->json($attendances);
    }


    // PUT /api/teacher/attendance/{id}
    public function updateAttendance(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Hadir,Izin,Sakit,Alfa',
        ]);

        $absensi = Attendance::findOrFail($id);
        $absensi->status = $request->status;
        $absensi->save();

        return response()->json(['message' => 'Absensi berhasil diperbarui']);
    }

    // POST /api/teacher/bank_soal
    public function storeBankSoal(Request $request)
    {
        $validated = $request->validate([
            'nama_materi' => 'required|string|max:45',
            'soal' => 'required|string',
            'materi' => 'required|string',
            'level' => 'required|in:Easy,Medium,Hard',
            'classes_id' => 'required|exists:classes,id',
            'is_free' => 'boolean'
        ]);

        $soal = BankSoal::create($validated);

        return response()->json(['message' => 'Bank soal berhasil ditambahkan', 'data' => $soal]);
    }

    // PUT /api/teacher/bank_soal/{id}
    public function updateBankSoal(Request $request, $id)
    {
        $soal = BankSoal::findOrFail($id);

        $request->validate([
            'nama_materi' => 'sometimes|string|max:45',
            'soal' => 'sometimes|string',
            'materi' => 'sometimes|string',
            'level' => 'sometimes|in:Easy,Medium,Hard',
            'classes_id' => 'sometimes|exists:classes,id',
            'is_free' => 'sometimes|boolean'
        ]);

        $soal->update($request->all());

        return response()->json(['message' => 'Bank soal berhasil diperbarui', 'data' => $soal]);
    }

    // DELETE /api/teacher/bank_soal/{id}
    public function deleteBankSoal($id)
    {
        $soal = BankSoal::findOrFail($id);
        $soal->delete();

        return response()->json(['message' => 'Bank soal berhasil dihapus']);
    }

    // POST /api/teacher/schedules
    public function createSchedule(Request $request)
    {
        $request->validate([
            'date_sched' => 'required|date',
            'course_name' => 'required|string|max:45',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'classes_id' => 'required|exists:classes,id',
        ]);

        // Buat jadwal dulu
        $schedule = Schedule::create([
            'date_sched' => $request->date_sched,
            'course_name' => $request->course_name,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'classes_id' => $request->classes_id,
        ]);

        // Ambil semua siswa di kelas tsb
        $students = User::where('classes_id', $request->classes_id)
            ->whereHas('role', function ($q) {
                $q->where('name_role', 'Siswa');
            })->get();

        if ($students->isEmpty()) {
            return response()->json(['message' => 'Belum ada siswa di kelas ini'], 400);
        }

        // Generate data attendance default (misalnya status default 'Alfa')
        foreach ($students as $student) {
            Attendance::create([
                'users_id'   => $student->id,
                'classes_id' => $request->classes_id,
                'schedule_id' => $schedule->id,
                'date'       => $request->date_sched,
                'status'     => 'Alfa' // default, bisa diupdate nanti
            ]);
        }

        return response()->json([
            'message' => 'Jadwal berhasil dibuat dan absensi siswa otomatis ditambahkan',
            'schedule' => $schedule
        ], 201);
    }
}
