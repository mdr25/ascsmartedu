<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ClassModel;
use App\Models\JenjangKelas;

class ClassController extends Controller
{
    public function index()
    {
        $classes = ClassModel::with(['jenjangKelas', 'teacher', 'students'])->get();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Data kelas berhasil diambil',
            'data' => $classes
        ], 200);
    }

    public function getByJenjang($jenjangId)
    {
        $jenjang = JenjangKelas::with('classes')->findOrFail($jenjangId);

        return response()->json([
            'jenjang' => $jenjang->nama_jenjang,
            'classes' => $jenjang->classes
        ]);
    }

    public function show($id)
{
    $class = ClassModel::with([
        'jenjangKelas',
        'teacher',
        'teachers',
        'mapel',
        'students.user'
    ])->findOrFail($id);

    return response()->json([
        'status' => 'success',
        'message' => 'Detail kelas berhasil diambil',
        'data' => [
            'class_id' => $class->id,
            'class_name' => $class->class_name,
            'jenjang_kelas' => $class->jenjangKelas,
            'description' => $class->description,
            'teacher' => $class->teacher,
            'assistant_teachers' => $class->teachers,
            'lessons' => $class->mapel,
            'students' => $class->students->pluck('user')->filter()->values(),
        ]
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'jenjang_kelas_id' => 'required|integer|exists:jenjang_kelas,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $class = ClassModel::create($validated);

        return response()->json([
            'message' => 'Kelas berhasil dibuat',
            'class' => $class,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'class_name' => 'required|string|max:255',
            'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id',
            'price' => 'nullable|numeric',
            'description' => 'nullable|string',
            'teacher_id' => 'nullable|exists:users,id',
        ]);

        $kelas = ClassModel::findOrFail($id);

        $kelas->class_name = $request->class_name;
        $kelas->jenjang_kelas_id = $request->jenjang_kelas_id;

        // Hindari NULL untuk price jika tidak dikirim
        if ($request->has('price')) {
            $kelas->price = $request->price;
        }

        $kelas->description = $request->description ?? $kelas->description;
        $kelas->teacher_id = $request->teacher_id ?? $kelas->teacher_id;
        $kelas->save();

        return response()->json([
            'message' => 'Kelas berhasil diperbarui',
            'data' => $kelas
        ]);
    }

    public function destroy($id)
    {
        $class = ClassModel::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Kelas berhasil dihapus']);
    }

    public function assignTeacher(Request $request, $classId)
    {
        $request->validate(['teacher_id' => 'required|exists:users,id']);

        $class = ClassModel::findOrFail($classId);
        $class->teacher_id = $request->teacher_id;
        $class->save();

        return response()->json(['message' => 'Pengajar utama berhasil di-assign']);
    }

    public function removeTeacher($id)
{
    $class = ClassModel::findOrFail($id);

    $class->teacher_id = null;
    $class->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Pengajar utama berhasil dihapus dari kelas.',
    ]);
}


    public function removeStudent($classId, $studentId)
    {
        $class = ClassModel::findOrFail($classId);
        $class->students()->detach($studentId);
    
        return response()->json(['message' => 'Siswa berhasil dihapus dari kelas']);
    }

    // public function addAssistantTeacher(Request $request, $classId)
    // {
    //     $request->validate(['teacher_id' => 'required|exists:users,id']);

    //     $class = ClassModel::findOrFail($classId);
    //     $class->teachers()->syncWithoutDetaching([$request->teacher_id]);

    //     return response()->json(['message' => 'Pengajar pendamping berhasil di-assign']);
    // }

    // public function removeAssistantTeacher($classId, $teacherId)
    // {
    //     $class = ClassModel::findOrFail($classId);
    //     $class->teachers()->detach($teacherId);

    //     return response()->json(['message' => 'Pengajar pendamping berhasil dihapus dari kelas']);
    // }
}
