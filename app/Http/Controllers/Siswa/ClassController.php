<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{ClassModel, Schedule, Mapel, Bab, Subbab, Konten, Payment};

class ClassController extends Controller
{
    // 🔹 Menampilkan semua kelas berdasarkan jenjang (umum)
    public function allClasses(Request $request)
    {
        $jenjangId = $request->query('jenjang_id');

        if (!$jenjangId) {
            return response()->json(['message' => 'Parameter jenjang_id wajib diisi'], 400);
        }

        $classes = ClassModel::where('jenjang_kelas_id', $jenjangId)
            ->select('id', 'class_name', 'price', 'jenjang_kelas_id')
            ->get();

        return response()->json($classes);
    }

    public function index(Request $request)
{
    $user = $request->user();

    $verifiedClassIds = Payment::where('user_id', $user->id)
        ->whereIn('status', ['paid', 'verified'])
        ->pluck('class_id')
        ->unique();

    $classes = ClassModel::whereIn('id', $verifiedClassIds)
        ->with(['jenjangKelas', 'teacher'])
        ->withCount('students')
        ->get();

    return response()->json($classes);
}


    // 🔹 Detail kelas
    public function show($id, Request $request)
    {
        $user = $request->user();

        if (!$this->checkClassAccess($user->id, $id)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $class = ClassModel::with([
            'jenjangKelas:id,nama_jenjang',
            'teacher:id,name',
            'teachers:id,name',
            'students.user:id,name' // ✅ avatar dihapus
        ])->findOrFail($id);

        $students = $class->students->map(function ($s) {
            return [
                'id' => $s->user->id,
                'name' => $s->user->name,
                // 'avatar' => $s->user->avatar, // ✅ avatar dihapus
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Detail kelas berhasil diambil',
            'data' => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'jenjang_kelas' => $class->jenjangKelas,
                'teacher' => $class->teacher,
                'teachers' => $class->teachers,
                'students' => $students,
            ],
        ]);
    }


    // 🔹 Jadwal kelas
    public function schedule($classId, Request $request)
    {
        $user = $request->user();

        if (!$this->checkClassAccess($user->id, $classId)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $schedule = Schedule::where('classes_id', $classId)->get();
        return response()->json($schedule);
    }

    // 🔹 Daftar mapel
    public function listMapel($classId, Request $request)
    {
        $user = $request->user();

        if (!$this->checkClassAccess($user->id, $classId)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $mapel = Mapel::where('classes_id', $classId)->get();
        return response()->json($mapel);
    }

    // 🔹 Daftar bab
    public function listBab($mapelId, Request $request)
    {
        $user = $request->user();
        $mapel = Mapel::findOrFail($mapelId);

        if (!$this->checkClassAccess($user->id, $mapel->classes_id)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $bab = Bab::where('mapel_id', $mapelId)->get();
        return response()->json($bab);
    }

    // 🔹 Daftar subbab
    public function listSubbab($babId, Request $request)
    {
        $user = $request->user();
        $bab = Bab::findOrFail($babId);
        $mapel = Mapel::findOrFail($bab->mapel_id);

        if (!$this->checkClassAccess($user->id, $mapel->classes_id)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $subbab = Subbab::where('bab_id', $babId)->get();
        return response()->json($subbab);
    }

    // 🔹 Konten per subbab
    public function listKonten($subbabId, Request $request)
    {
        $user = $request->user();
        $subbab = Subbab::findOrFail($subbabId);
        $bab = Bab::findOrFail($subbab->bab_id);
        $mapel = Mapel::findOrFail($bab->mapel_id);

        if (!$this->checkClassAccess($user->id, $mapel->classes_id)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $konten = Konten::where('subbab_id', $subbabId)->get();
        return response()->json($konten);
    }

    // 🔹 Konten langsung dari bab (tanpa subbab)
    public function listKontenByBab($babId, Request $request)
    {
        $user = $request->user();
        $bab = Bab::findOrFail($babId);
        $mapel = Mapel::findOrFail($bab->mapel_id);

        if (!$this->checkClassAccess($user->id, $mapel->classes_id)) {
            return response()->json(['message' => 'Kamu belum membeli kelas ini'], 403);
        }

        $konten = Konten::where('bab_id', $babId)->whereNull('subbab_id')->get();
        return response()->json($konten);
    }

    private function checkClassAccess($userId, $classId)
    {
        return Payment::where('user_id', $userId)
            ->where('class_id', $classId)
            ->whereIn('status', ['paid', 'verified'])
            ->exists();
    }
}
