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
        $classes = ClassModel::with(['jenjangKelas', 'teacher'])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data kelas berhasil diambil',
            'data' => $classes
        ], 200);
    }

    public function show($id)
    {
        $class = ClassModel::with(['jenjangKelas', 'teacher', 'teachers'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Detail kelas berhasil diambil',
            'data' => [
                'class_id' => $class->id,
                'class_name' => $class->class_name,
                'jenjang_kelas' => $class->jenjangKelas,
                'description' => $class->description,
                'teacher' => $class->teacher, // pengajar utama
                'assistant_teachers' => $class->teachers, // pengajar pendamping (pivot)
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
            // 'teacher_id' => 'nullable|exists:users,id', // aktifkan jika mau assign pengajar
        ]);

        $class = ClassModel::create($validated);

        return response()->json([
            'message' => 'Kelas berhasil dibuat',
            'class' => $class,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $class = ClassModel::findOrFail($id);

        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'jenjang_kelas_id' => 'required|integer|exists:jenjang_kelas,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            // 'teacher_id' => 'nullable|exists:users,id',
        ]);

        $class->update($validated);

        return response()->json([
            'message' => 'Kelas berhasil diupdate',
            'class' => $class,
        ]);
    }

    public function destroy($id)
    {
        $class = ClassModel::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Kelas berhasil dihapus']);
    }

    // Assign pengajar utama (update kolom teacher_id)
    public function assignTeacher(Request $request, $classId)
    {
        $request->validate(['teacher_id' => 'required|exists:users,id']);
        $class = ClassModel::findOrFail($classId);
        $class->teacher_id = $request->teacher_id;
        $class->save();

        return response()->json(['message' => 'Pengajar utama berhasil di-assign']);
    }

    public function removeTeacher($classId)
    {
        $class = ClassModel::findOrFail($classId);
        $class->teacher_id = null;
        $class->save();

        return response()->json(['message' => 'Pengajar utama berhasil dihapus dari kelas']);
    }

    // Assign pengajar pendamping (pivot)
    public function addAssistantTeacher(Request $request, $classId)
    {
        $request->validate(['teacher_id' => 'required|exists:users,id']);
        $class = ClassModel::findOrFail($classId);
        $class->teachers()->syncWithoutDetaching([$request->teacher_id]);
        return response()->json(['message' => 'Pengajar pendamping berhasil di-assign']);
    }

    public function removeAssistantTeacher($classId, $teacherId)
    {
        $class = ClassModel::findOrFail($classId);
        $class->teachers()->detach($teacherId);
        return response()->json(['message' => 'Pengajar pendamping berhasil dihapus dari kelas']);
    }
}
