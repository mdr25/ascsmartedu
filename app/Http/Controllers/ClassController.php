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

    public function index(Request $request)
    {
        $jenjang = $request->query('jenjang');
        $classes = ClassModel::when($jenjang, fn($q) => $q->where('jenjang_id', $jenjang))->get();
        return response()->json($classes);
    }

    public function listMapel($classId)
    {
        $mapel = Mapel::where('classes_id', $classId)->get();
        return response()->json($mapel);
    }

    public function listBab($mapelId)
    {
        $bab = Bab::where('mapel_id', $mapelId)->get();
        return response()->json($bab);
    }

    public function listSubbab($babId)
    {
        $subbab = Subbab::where('bab_id', $babId)->get();
        return response()->json($subbab);
    }

    public function listKonten($subbabId)
    {
        // Hanya tampilkan konten yang is_free = true
        $konten = Konten::where('subbab_id', $subbabId)->where('is_free', true)->get();
        return response()->json($konten);
    }
}
