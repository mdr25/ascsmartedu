<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subbab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubbabController extends Controller
{
    public function index(Request $request)
    {
        $query = Subbab::with('bab.mata_pelajaran.classes.jenjangKelas');

        if ($request->has('bab_id')) {
            $query->where('bab_id', $request->bab_id);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bab_id' => 'required|exists:bab,id',
            'judul_subbab' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subbab = Subbab::create($validator->validated());

        return response()->json(['message' => 'Subbab berhasil dibuat', 'data' => $subbab]);
    }

    public function show($id)
    {
        $subbab = Subbab::with('bab.mata_pelajaran.classes.jenjangKelas')->findOrFail($id);
        return response()->json($subbab);
    }

    public function update(Request $request, $id)
    {
        $subbab = Subbab::findOrFail($id);

        $validator = Validator::make($request->all(), [
            // 'bab_id' => 'sometimes|exists:bab,id',
            'judul_subbab' => 'sometimes|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subbab->update($validator->validated());

        return response()->json(['message' => 'Subbab berhasil diupdate', 'data' => $subbab]);
    }

    public function destroy($id)
    {
        $subbab = Subbab::findOrFail($id);
        $subbab->delete();

        return response()->json(['message' => 'Subbab berhasil dihapus']);
    }
}
