<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bab;
use Illuminate\Http\Request;

class BabController extends Controller
{
    public function index($pelajaranId)
    {
        $bab = Bab::where('pelajaran_id', $pelajaranId)->get();
        return response()->json($bab);
    }

    public function store(Request $request, $pelajaranId)
    {
        $request->validate([
            'nama_bab' => 'required|string|max:255',
        ]);

        $bab = Bab::create([
            'nama_bab' => $request->nama_bab,
            'pelajaran_id' => $pelajaranId,
        ]);

        return response()->json(['message' => 'Bab berhasil ditambahkan', 'data' => $bab], 201);
    }

    public function show($id)
    {
        $bab = Bab::findOrFail($id);
        return response()->json($bab);
    }

    public function update(Request $request, $id)
    {
        $bab = Bab::findOrFail($id);

        $request->validate([
            'nama_bab' => 'required|string|max:255',
        ]);

        $bab->update($request->only('nama_bab'));

        return response()->json(['message' => 'Bab berhasil diperbarui', 'data' => $bab]);
    }

    public function destroy($id)
    {
        $bab = Bab::findOrFail($id);
        $bab->delete();

        return response()->json(['message' => 'Bab berhasil dihapus']);
    }
}
