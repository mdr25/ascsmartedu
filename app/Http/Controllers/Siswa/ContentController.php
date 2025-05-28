<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Konten;


class ContentController extends Controller
{
    // GET /student/contents
    public function index(Request $request)
    {
        $user = $request->user();

        // Ambil semua class_id yang sudah dibeli user
        $classIds = $user->classes()->pluck('classes.id')->toArray();

        $query = Konten::with(['bab', 'subbab'])
            ->whereHas('bab.mapel', function ($q) use ($classIds) {
                $q->whereIn('classes_id', $classIds);
            });

        // Optional filter by bab_id / subbab_id
        if ($request->has('bab_id')) {
            $query->where('bab_id', $request->bab_id);
        }
        if ($request->has('subbab_id')) {
            $query->where('subbab_id', $request->subbab_id);
        }

        $contents = $query->get();

        return response()->json($contents);
    }

    // GET /student/contents/{id}
    public function show($id, Request $request)
    {
        $user = $request->user();
        $konten = Konten::with(['bab.mapel', 'subbab'])->findOrFail($id);

        // Cek: user sudah beli kelas dari konten ini?
        $classId = $konten->bab?->mapel?->classes_id;
        if (!$classId || !$user->classes()->where('classes.id', $classId)->exists()) {
            return response()->json(['message' => 'Konten tidak dapat diakses, silakan beli kelasnya'], 403);
        }

        return response()->json($konten);
    }
}
