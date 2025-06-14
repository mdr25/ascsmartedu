<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BabController extends Controller
{
    public function index(Request $request)
{
    $query = Bab::with('mata_pelajaran.classes.jenjangKelas');

    if ($request->has('mapel_id')) {
        $query->where('mapel_id', $request->mapel_id);
    }

    return response()->json($query->latest()->get());
}

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'mapel_id' => 'required|exists:mata_pelajaran,id',
        'nama_bab' => 'required|string|max:100', 
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $bab = Bab::create($validator->validated());

    $bab->load('mata_pelajaran.classes.jenjangKelas');

    return response()->json(['message' => 'Bab berhasil dibuat', 'data' => $bab]);
}


    // Tampilkan detail bab berdasarkan ID
    public function show($id)
    {
        $bab = Bab::with('mata_pelajaran.classes.jenjangKelas')->findOrFail($id);

        return response()->json($bab);
    }

    // Update bab berdasarkan ID
    public function update(Request $request, $id)
    {
        $bab = Bab::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama_bab' => 'sometimes|required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bab->update($validator->validated());

        $bab->load('mata_pelajaran.classes.jenjangKelas');

        return response()->json(['message' => 'Bab berhasil diupdate', 'data' => $bab]);
    }

    // Hapus bab berdasarkan ID
    public function destroy($id)
    {
        $bab = Bab::findOrFail($id);
        $bab->delete();

        return response()->json(['message' => 'Bab berhasil dihapus']);
    }
}
