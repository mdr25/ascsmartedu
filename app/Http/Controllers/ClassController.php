<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    // Lihat semua kelas
    public function index()
    {
        return response()->json(ClassModel::with('jenjangKelas')->get());
    }

    // Buat kelas baru (Admin)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'class_name' => 'required|string|max:45',
            'total_student' => 'required|integer|min:1',
            'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id',
        ]);

        $class = ClassModel::create($validatedData);

        return response()->json(['message' => 'Class Created', 'data' => $class]);
    }

    // Update kelas (Admin)
    public function update(Request $request, $id)
    {
        $class = ClassModel::find($id);
        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $validatedData = $request->validate([
            'class_name' => 'string|max:45',
            'total_student' => 'integer|min:1',
            'jenjang_kelas_id' => 'exists:jenjang_kelas,id',
        ]);

        $class->update($validatedData);

        return response()->json(['message' => 'Class Updated', 'data' => $class]);
    }

    // Hapus kelas (Admin)
    public function destroy($id)
    {
        $class = ClassModel::find($id);
        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $class->delete();
        return response()->json(['message' => 'Class Deleted']);
    }
}
