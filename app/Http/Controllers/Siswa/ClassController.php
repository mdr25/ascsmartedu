<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{ClassModel, Schedule, Mapel, Bab, Subbab, Konten};
use App\Models\User;
use App\Models\BookmarkedClass;

class ClassController extends Controller
{
    public function index(Request $request)
    {
        $jenjang = $request->query('jenjang');

        $classes = ClassModel::when(
            $jenjang,
            fn($query) =>
            $query->where('jenjang_id', $jenjang)
        )->get();

        return response()->json($classes);
    }

    public function schedule($classId)
    {
        $schedule = Schedule::where('classes_id', $classId)->get();
        return response()->json($schedule);
    }

    public function bookmark($classId, Request $request)
    {
        $user = $request->user();
        $user->bookmarkedClasses()->syncWithoutDetaching([$classId]);

        return response()->json(['message' => 'Kelas berhasil ditambahkan ke daftar belajar']);
    }

    public function unbookmark($classId, Request $request)
    {
        $user = $request->user();
        $user->bookmarkedClasses()->detach($classId);

        return response()->json(['message' => 'Kelas berhasil dihapus dari daftar belajar']);
    }

    public function listBookmarkedClasses(Request $request)
    {
        $user = $request->user();
        return response()->json($user->bookmarkedClasses()->with('mapel')->get());
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
        $konten = Konten::where('subbab_id', $subbabId)->get();
        return response()->json($konten);
    }
}
