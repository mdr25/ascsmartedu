<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\{User, ClassModel};
use Illuminate\Support\Facades\Auth;

class ClassController extends Controller
{
    public function index()
    {
        $teacher = Auth::user();
        $kelas = ClassModel::find($teacher->classes_id);

        return $kelas
            ? response()->json($kelas)
            : response()->json(['message' => 'Pengajar tidak memiliki kelas'], 404);
    }

    public function students($id)
    {
        $students = User::where('classes_id', $id)
            ->whereHas('role', fn($q) => $q->where('name_role', 'Siswa'))
            ->get();

        return response()->json($students);
    }
}
