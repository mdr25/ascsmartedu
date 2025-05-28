<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{ClassModel, Schedule, Mapel, Bab, Subbab, Konten};

class ClassController extends Controller
{
    // List kelas yang sudah dibeli user
    public function index(Request $request)
    {
        $user = $request->user();
        $classes = $user->classes()->with('jenjangKelas')->get();
        return response()->json($classes);
    }

    // Jadwal kelas (hanya jika sudah beli kelas)
    public function schedule($classId, Request $request)
    {
        $user = $request->user();
        if (!$user->classes()->where('classes.id', $classId)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        $schedule = Schedule::where('classes_id', $classId)->get();
        return response()->json($schedule);
    }

    // List mapel di kelas (hanya jika sudah beli kelas)
    public function listMapel($classId, Request $request)
    {
        $user = $request->user();
        if (!$user->classes()->where('classes.id', $classId)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        $mapel = Mapel::where('classes_id', $classId)->get();
        return response()->json($mapel);
    }

    // List bab di mapel (cek akses ke kelas dari mapel)
    public function listBab($mapelId, Request $request)
    {
        $user = $request->user();
        $mapel = Mapel::findOrFail($mapelId);
        if (!$user->classes()->where('classes.id', $mapel->classes_id)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        $bab = Bab::where('mapel_id', $mapelId)->get();
        return response()->json($bab);
    }

    // List subbab di bab (cek akses ke kelas dari bab->mapel)
    public function listSubbab($babId, Request $request)
    {
        $user = $request->user();
        $bab = Bab::findOrFail($babId);
        $mapel = Mapel::findOrFail($bab->mapel_id);
        if (!$user->classes()->where('classes.id', $mapel->classes_id)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        $subbab = Subbab::where('bab_id', $babId)->get();
        return response()->json($subbab);
    }

    // List konten di subbab (cek akses ke kelas dari subbab->bab->mapel)
    public function listKonten($subbabId, Request $request)
    {
        $user = $request->user();
        $subbab = Subbab::findOrFail($subbabId);
        $bab = Bab::findOrFail($subbab->bab_id);
        $mapel = Mapel::findOrFail($bab->mapel_id);
        if (!$user->classes()->where('classes.id', $mapel->classes_id)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        $konten = Konten::where('subbab_id', $subbabId)->get();
        return response()->json($konten);
    }

    public function listKontenByBab($babId, Request $request)
    {
        $user = $request->user();
        $bab = Bab::findOrFail($babId);
        $mapel = Mapel::findOrFail($bab->mapel_id);
        if (!$user->classes()->where('classes.id', $mapel->classes_id)->exists()) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }
        // Ambil konten yang langsung ada di bab (subbab_id = null)
        $konten = Konten::where('bab_id', $babId)->whereNull('subbab_id')->get();
        return response()->json($konten);
    }
}
