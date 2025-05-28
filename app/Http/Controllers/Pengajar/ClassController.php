<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ClassController extends Controller
{
    // List semua kelas yang diajar pengajar (bisa lebih dari satu)
    public function index()
    {
        $teacher = Auth::user();

        // Ambil ID kelas dari pivot class_teacher
        $classIds = DB::table('class_teacher')
            ->where('teacher_id', $teacher->id)
            ->pluck('class_id')
            ->toArray();

        // Ambil data kelas
        $kelas = DB::table('classes')
            ->whereIn('id', $classIds)
            ->get();

        return response()->json($kelas);
    }

    // (Opsional) Detail kelas
    public function show($id)
    {
        $teacher = Auth::user();

        // Cek apakah kelas ini memang diajar oleh pengajar login
        $exists = DB::table('class_teacher')
            ->where('teacher_id', $teacher->id)
            ->where('class_id', $id)
            ->exists();

        if (!$exists) {
            return response()->json(['message' => 'Kelas tidak ditemukan atau bukan kelas yang Anda ajar'], 404);
        }

        $kelas = DB::table('classes')->where('id', $id)->first();
        return response()->json($kelas);
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
