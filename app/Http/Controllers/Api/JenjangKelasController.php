<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenjangKelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JenjangKelasController extends Controller
{
    public function index()
    {
        $data = JenjangKelas::all();

        return response()->json([
            'message' => 'Data jenjang kelas berhasil diambil',
            'data'    => $data
        ], 200);
    }



    public function pilih(Request $request)
    {
        $request->validate([
            'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id',
        ]);

        $user = Auth::user();
        $user->jenjang_kelas_id = $request->jenjang_kelas_id;
        $user->save();

        // Ambil data jenjang dari relasi
        $jenjang = JenjangKelas::with('classes')->find($user->jenjang_kelas_id);

        return response()->json([
            'message' => 'Jenjang kelas berhasil dipilih',
            'data' => [
                'user' => [
                    'id'               => $user->id,
                    'jenjang_kelas_id' => $jenjang->id,
                    'nama_jenjang'     => $jenjang->nama_jenjang,
                ],
                'classes' => $jenjang->classes->map(function ($class) {
                    return [
                        'id'             => $class->id,
                        'class_name'     => $class->class_name,
                        'total_student'  => $class->total_student,
                    ];
                })
            ]
        ], 200);
    }

}
