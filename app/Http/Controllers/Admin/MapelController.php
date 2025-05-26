<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mapel;

class MapelController extends Controller
{
    public function index()
    {
        $mapels = Mapel::all();
        return response()->json($mapels);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_mapel' => 'required|string|max:50|unique:mata_pelajaran,nama_mapel',
            'classes_id' => 'required|integer|exists:classes,id',  // wajib dan harus ada di tabel classes
        ]);

        $mapel = Mapel::create($validated);

        return response()->json([
            'message' => 'Mata pelajaran berhasil dibuat',
            'mata_pelajaran' => $mapel,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $mapel = Mapel::findOrFail($id);

        $validated = $request->validate([
            'nama_mapel' => "required|string|max:50|unique:mata_pelajaran,nama_mapel,{$id}"
        ]);

        $mapel->update($validated);

        return response()->json([
            'message' => 'Mata pelajaran berhasil diupdate',
            'mata_pelajaran' => $mapel,
        ]);
    }

    public function destroy($id)
    {
        $mapel = Mapel::findOrFail($id);
        $mapel->delete();

        return response()->json(['message' => 'Mata pelajaran berhasil dihapus']);
    }
}
