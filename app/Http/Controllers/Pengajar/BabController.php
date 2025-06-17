<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\Bab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BabController extends Controller
{
    // public function index(Request $request)
    // {
    //     $user = Auth::user();

    //     $query = Bab::with('mata_pelajaran.classes.jenjangKelas');

    //     if ($request->has('mapel_id')) {
    //         $mapelId = $request->mapel_id;

    //         // Ambil mapel dan relasi ke kelas
    //         $mapel = Mapel::with('classes')->findOrFail($mapelId);

    //         // Ambil semua class yang punya teacher_id sama dengan pengajar login
    //         $allowedClassIds = $mapel->classes
    //             ->filter(fn($class) => $class->teacher_id === $user->id)
    //             ->pluck('id');

    //         if ($allowedClassIds->isEmpty()) {
    //             return response()->json(['message' => 'Anda tidak berhak mengakses bab ini'], 403);
    //         }

    //         // Filter bab berdasarkan mapel yang valid
    //         $query->where('mapel_id', $mapelId);
    //     }

    //     return response()->json($query->latest()->get());
    // }

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
