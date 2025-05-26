<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{User, Bab, Konten};


class ContentController extends Controller
{
    // GET /student/contents
    public function index(Request $request)
    {
        $query = Konten::with(['bab', 'subbab']);

        // Optional filter by bab_id / subbab_id
        if ($request->has('bab_id')) {
            $query->where('bab_id', $request->bab_id);
        }

        if ($request->has('subbab_id')) {
            $query->where('subbab_id', $request->subbab_id);
        }

        $user = $request->user();
        if (!$user->hasActiveSubscription()) {
            $query->where('is_free', true);
        }

        $contents = $query->get();

        return response()->json($contents);
    }

    // GET /student/contents/{id}
    // public function show($id)
    // {
    //     /** @var User $user */
    //     $user = Auth::user();

    //     $konten = Konten::with(['bab.mapel.classes', 'subbab'])
    //         ->findOrFail($id);

    //     // Cek akses: boleh akses jika konten gratis atau dari kelas siswa
    //     $isAccessible = $konten->is_free || (
    //         $konten->bab &&
    //         $konten->bab->mapel &&
    //         $konten->bab->mapel->classes_id === $user->classes_id
    //     );

    //     if (!$isAccessible) {
    //         return response()->json(['message' => 'Konten tidak dapat diakses'], 403);
    //     }

    //     return response()->json([
    //         'id' => $konten->id,
    //         'judul_konten' => $konten->judul_konten,
    //         'tipe_konten' => $konten->tipe_konten,
    //         'konten_url' => $konten->konten_url,
    //         'durasi' => $konten->durasi,
    //         'is_free' => $konten->is_free,
    //         'bab' => $konten->bab?->nama_bab,
    //         'subbab' => $konten->subbab?->judul_subbab
    //     ]);
    // }

    // GET /student/contents/{id}
    public function show($id, Request $request)
    {
        $konten = Konten::with(['bab', 'subbab'])->findOrFail($id);

        $user = $request->user();
        if (!$konten->is_free && !$user->hasActiveSubscription()) {
            return response()->json(['message' => 'Konten ini hanya untuk pengguna berlangganan'], 403);
        }

        return response()->json($konten);
    }
}
