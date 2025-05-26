<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JenjangKelas;

class JenjangController extends Controller
{
    // List semua jenjang
    public function index()
    {
        $jenjangs = JenjangKelas::all();
        return response()->json($jenjangs);
    }

    // Simpan jenjang baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jenjang' => 'required|string|max:100|unique:jenjang_kelas,nama_jenjang',
        ]);

        $jenjang = JenjangKelas::create([
            'nama_jenjang' => $validated['nama_jenjang'],
        ]);

        return response()->json([
            'message' => 'Jenjang berhasil dibuat',
            'jenjang' => $jenjang,
        ], 201);
    }

    // Update jenjang berdasarkan id
    public function update(Request $request, $id)
    {
        $jenjang = JenjangKelas::findOrFail($id);

        $validated = $request->validate([
            'nama_jenjang' => 'required|string|max:100|unique:jenjang_kelas,nama_jenjang,' . $id,
        ]);

        $jenjang->update(['nama_jenjang' => $validated['nama_jenjang']]);

        return response()->json([
            'message' => 'Jenjang berhasil diupdate',
            'jenjang' => $jenjang,
        ]);
    }

    // Hapus jenjang
    public function destroy($id)
    {
        $jenjang = JenjangKelas::findOrFail($id);
        $jenjang->delete();

        return response()->json(['message' => 'Jenjang berhasil dihapus']);
    }
}
