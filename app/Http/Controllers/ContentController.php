<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Konten;

class ContentController extends Controller
{
    public function show($id)
    {
        $konten = Konten::with(['bab', 'subbab'])->findOrFail($id);

        // Hanya boleh akses konten gratis
        if (!$konten->is_free) {
            return response()->json(['message' => 'Konten ini hanya untuk pengguna berlangganan'], 403);
        }

        return response()->json($konten);
    }
}
