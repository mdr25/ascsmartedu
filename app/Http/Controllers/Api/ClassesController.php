<?php

namespace App\Http\Controllers\Api;

use App\Models\Classes;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ClassesController extends Controller
{
    use AuthorizesRequests;

    /**
     * Menampilkan daftar kelas berdasarkan jenjang (untuk siswa)
     */
    public function byJenjang($jenjang_kelas_id)
    {
        $classes = Classes::where('jenjang_kelas_id', $jenjang_kelas_id)
                          ->select('id', 'class_name', 'total_student', 'jenjang_kelas_id')
                          ->get();

        if ($classes->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada kelas ditemukan untuk jenjang ini.',
                'data'    => []
            ], 404);
        }

        return response()->json([
            'message' => 'Daftar kelas berdasarkan jenjang.',
            'data'    => $classes
        ]);
    }

    /**
     * Menampilkan daftar kelas yang bisa diakses oleh siswa (sudah bayar)
     */
    public function getAccessibleClasses($user_id)
    {
        // Ambil semua payment yang statusnya 'paid' untuk user tertentu, beserta relasi kelas-nya
        $payments = Payment::with('classes')
            ->where('users_id', $user_id)
            ->where('status', 'paid')
            ->get();

        // Ambil ID kelas dari payment yang sudah dibayar
        $classIds = $payments->pluck('classes')->flatten()->pluck('id')->unique();

        // Ambil data kelas berdasarkan ID unik yang sudah dibayar
        $classes = Classes::whereIn('id', $classIds)
            ->with('jenjangKelas')
            ->get();

        if ($classes->isEmpty()) {
            return response()->json([
                'message' => 'Belum ada kelas yang bisa diakses.',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'message' => 'Kelas yang bisa diakses.',
            'data'    => $classes
        ], 200);
    }

    /**
     * Detail kelas (hanya jika siswa sudah bayar)
     */
    public function show($user_id, $classes_id)
    {
        $hasPaid = Payment::where('users_id', $user_id)
            ->where('status', 'paid')
            ->where('classes_id', $classes_id)
            ->exists();

        if (!$hasPaid) {
            return response()->json([
                'message' => 'Siswa belum membayar untuk kelas ini.',
                'access'  => false
            ], 403);
        }

        $class = Classes::with(['schedules', 'jenjangKelas'])->find($classes_id);

        if (!$class) {
            return response()->json([
                'message' => 'Kelas tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'message' => 'Detail kelas.',
            'access'  => true,
            'data'    => $class
        ]);
    }

    /**
     * Menambahkan kelas baru (hanya untuk admin dan pengajar)
     */
    public function store(Request $request)
    {
        
        $this->authorize('create', Classes::class);

        $request->validate([
            'class_name'       => 'required|string|max:255',
            'total_student'    => 'required|integer|min:1',
            'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id'
        ]);

        $class = Classes::create($request->only([
            'class_name', 'total_student', 'jenjang_kelas_id'
        ]));

        return response()->json([
            'message' => 'Kelas berhasil ditambahkan.',
            'data'    => $class
        ], 201);
    }

    /**
     * Mengupdate kelas (hanya untuk admin dan pengajar tertentu)
     */
    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);

        $this->authorize('update', $class);

        $request->validate([
            'class_name'       => 'required|string|max:255',
            'total_student'    => 'required|integer|min:1',
            'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id'
        ]);

        $class->update($request->only([
            'class_name', 'total_student', 'jenjang_kelas_id'
        ]));

        return response()->json([
            'message' => 'Kelas berhasil diperbarui.',
            'data'    => $class
        ]);
    }

    /**
     * Menghapus kelas (hanya untuk admin)
     */
    public function destroy($id)
{
    // Cari kelas berdasarkan ID, bersama dengan relasi jenjangKelas
    $class = Classes::with('jenjangKelas')->findOrFail($id);

    // Memastikan user memiliki izin untuk menghapus kelas
    $this->authorize('delete', $class);

    // Menyimpan nama jenjang yang terkait dengan kelas
    $nama_jenjang = $class->jenjangKelas->nama_jenjang;

    // Hapus kelas
    $class->delete();

    // Kembalikan respons dengan informasi yang dibutuhkan
    return response()->json([
        'message' => 'Kelas berhasil dihapus.',
        'deleted_class_id' => $id,
        'class_name' => $class->class_name,
        'jenjang_kelas_name' => $nama_jenjang,  // Menambahkan nama jenjang yang terkait
    ]);
}


}
