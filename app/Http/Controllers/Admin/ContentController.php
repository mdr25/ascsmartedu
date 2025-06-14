<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Konten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    public function index(Request $request)
    {
        $query = Konten::with(['bab.mata_pelajaran.classes.jenjangKelas', 'subbab.bab']);

        if ($request->has('bab_id')) {
            $query->where('bab_id', $request->bab_id);
        }

        if ($request->has('subbab_id')) {
            $query->where('subbab_id', $request->subbab_id);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul_konten' => 'required|string|max:100',
            'durasi' => 'required|string|max:10',
            'tipe_konten' => 'required|in:video,link,pdf',
            'konten_url' => 'required|string',
            'bab_id' => 'nullable|exists:bab,id',
            'subbab_id' => 'nullable|exists:subbab,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Harus pilih salah satu: bab atau subbab
        if (!$request->bab_id && !$request->subbab_id) {
            return response()->json(['error' => 'Harap isi bab_id atau subbab_id'], 422);
        }

        $konten = Konten::create($validator->validated());

        return response()->json(['message' => 'Konten berhasil dibuat', 'data' => $konten]);
    }

    public function show($id)
    {
        $konten = Konten::with(['bab', 'subbab'])->findOrFail($id);
        return response()->json($konten);
    }

    public function update(Request $request, $id)
    {
        $konten = Konten::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'judul_konten' => 'sometimes|string|max:100',
            'durasi' => 'sometimes|string|max:10',
            'tipe_konten' => 'in:video,link,pdf',
            'konten_url' => 'sometimes|string',
            'bab_id' => 'nullable|exists:bab,id',
            'subbab_id' => 'nullable|exists:subbab,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $konten->update($validator->validated());

        return response()->json(['message' => 'Konten berhasil diupdate', 'data' => $konten]);
    }

    public function destroy($id)
    {
        $konten = Konten::findOrFail($id);
        $konten->delete();

        return response()->json(['message' => 'Konten berhasil dihapus']);
    }
}
