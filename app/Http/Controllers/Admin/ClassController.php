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
        // Bisa juga nanti tambah eager loading jenjang
        $classes = ClassModel::with('jenjangKelas')->get();
        return response()->json($classes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'jenjang_kelas_id' => 'required|integer|exists:jenjang_kelas,id',
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
}
