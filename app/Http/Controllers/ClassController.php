<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{JenjangKelas, ClassModel, Mapel, Bab, Subbab, Konten};

class ClassController extends Controller
{
    public function listJenjang()
    {
        return response()->json(JenjangKelas::all());
    }

    // List semua kelas (katalog)
    public function index(Request $request)
    {
        $jenjang = $request->query('jenjang');
        $classes = ClassModel::when(
            $jenjang,
            fn($query) => $query->where('jenjang_kelas_id', $jenjang)
        )->get();

        return response()->json($classes);
    }
}
