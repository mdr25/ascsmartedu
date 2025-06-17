<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\ClassModel;

class ClassController extends Controller
{
    // List semua kelas yang diajar pengajar (bisa lebih dari satu)
    public function index()
    {
        $teacher = Auth::user(); // pastikan ini user dengan role guru

        // Ambil semua kelas di mana teacher_id = id guru yang login
        $classes = ClassModel::where('teacher_id', $teacher->id)
            ->with([
                'jenjangKelas:id,nama_jenjang',
                'teacher:id,name',
            ])
            ->withCount('students')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Daftar kelas yang Anda ajar',
            'data' => $classes,
        ]);
    }

    // (Opsional) Detail kelas
    public function show($id)
    {
        $teacher = Auth::user();

        // Cek apakah kelas ini memang diajar oleh pengajar login
        // $exists = DB::table('class_teacher')
        //     ->where('teacher_id', $teacher->id)
        //     ->where('class_id', $id)
        //     ->exists();

        $exists = ClassModel::where('id', $id)
            ->where('teacher_id', $teacher->id)
            ->exists();

        if (!$exists) {
            return response()->json(['message' => 'Kelas tidak ditemukan atau bukan kelas yang Anda ajar'], 404);
        }

        $class = ClassModel::with([
            'jenjangKelas:id,nama_jenjang',
            'teacher:id,name',
            // 'teachers:id,name',
            'students.user:id,name' // ✅ avatar dihapus
        ])->findOrFail($id);

        $students = $class->students->map(function ($s) {
            return [
                'id' => $s->user->id,
                'name' => $s->user->name,
                // 'avatar' => $s->user->avatar, // ✅ avatar dihapus
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Detail kelas berhasil diambil',
            'data' => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'jenjang_kelas' => $class->jenjangKelas,
                'teacher' => $class->teacher,
                'teachers' => $class->teachers,
                'students' => $students,
            ],
        ]);
    }

    // List siswa di kelas tertentu
    public function students($id)
    {
        $teacher = Auth::user();

        // Cek apakah pengajar memang mengajar kelas ini
        $exists = DB::table('class_teacher')
            ->where('teacher_id', $teacher->id)
            ->where('class_id', $id)
            ->exists();

        if (!$exists) {
            return response()->json(['message' => 'Kelas tidak ditemukan atau bukan kelas yang Anda ajar'], 404);
        }

        // Ambil siswa dari pivot class_user
        $studentIds = DB::table('class_user')
            ->where('class_id', $id)
            ->pluck('user_id')
            ->toArray();

        $students = User::whereIn('id', $studentIds)
            ->whereHas('role', fn($q) => $q->where('name_role', 'Siswa'))
            ->get();

        return response()->json($students);
    }
}
