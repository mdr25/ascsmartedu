<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pelajaran;
use Illuminate\Http\Request;

class PelajaranController extends Controller
{
    public function index($classId)
    {
        // Pakai 'classes_id' sesuai migrasi
        $pelajaran = Pelajaran::where('classes_id', $classId)->get();
        return response()->json($pelajaran);
    }

    public function store(Request $request, $classId)
    {
        $validated = $request->validate([
            'nama_pelajaran' => 'required|string|max:255',
        ]);

        $pelajaran = Pelajaran::create([
            'nama_pelajaran' => $validated['nama_pelajaran'],
            'classes_id' => $classId,  // sesuaikan nama kolom
        ]);

        return response()->json(['message' => 'Pelajaran berhasil ditambahkan', 'data' => $pelajaran], 201);
    }

    public function show($id)
    {
        $pelajaran = Pelajaran::findOrFail($id);
        return response()->json($pelajaran);
    }

    public function update(Request $request, $id)
    {
        $pelajaran = Pelajaran::findOrFail($id);
        $validated = $request->validate([
            'nama_pelajaran' => 'required|string|max:255',
        ]);

        $pelajaran->update($validated);

        return response()->json(['message' => 'Pelajaran berhasil diperbarui', 'data' => $pelajaran]);
    }

    public function destroy($id)
    {
        $pelajaran = Pelajaran::findOrFail($id);
        $pelajaran->delete();

        return response()->json(['message' => 'Pelajaran berhasil dihapus']);
    }
}
