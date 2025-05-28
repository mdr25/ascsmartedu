<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\BankSoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BankSoalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Ambil semua kelas yang diajar pengajar ini
        $classIds = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->pluck('class_id')
            ->toArray();

        // List bank soal hanya untuk kelas yang diajar pengajar ini
        $query = BankSoal::whereIn('classes_id', $classIds);

        // (Opsional) filter by kelas
        if ($request->has('classes_id')) {
            $query->where('classes_id', $request->classes_id);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_materi' => 'required|string|max:45',
            'soal' => 'required|string',
            'materi' => 'required|string',
            'level' => 'required|in:Easy,Medium,Hard',
            'classes_id' => 'required|exists:classes,id',
        ]);

        // (Opsional) Validasi pengajar hanya bisa tambah soal di kelas yang diajar
        $user = $request->user();
        $isTeaching = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->where('class_id', $validated['classes_id'])
            ->exists();
        if (!$isTeaching) {
            return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        }

        $soal = BankSoal::create($validated);

        return response()->json(['message' => 'Bank soal berhasil ditambahkan', 'data' => $soal]);
    }

    public function update(Request $request, $id)
    {
        $soal = BankSoal::findOrFail($id);

        // Validasi pengajar hanya bisa update soal di kelas yang diajar
        $user = $request->user();
        $isTeaching = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->where('class_id', $soal->classes_id)
            ->exists();
        if (!$isTeaching) {
            return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        }

        $soal->update($request->all());

        return response()->json(['message' => 'Bank soal berhasil diperbarui', 'data' => $soal]);
    }

    public function destroy(Request $request, $id)
    {
        $soal = BankSoal::findOrFail($id);

        $user = $request->user();
        $isTeaching = DB::table('class_teacher')
            ->where('teacher_id', $user->id)
            ->where('class_id', $soal->classes_id)
            ->exists();
        if (!$isTeaching) {
            return response()->json(['message' => 'Anda tidak mengajar kelas ini'], 403);
        }

        $soal->delete();

        return response()->json(['message' => 'Bank soal berhasil dihapus']);
    }
}
