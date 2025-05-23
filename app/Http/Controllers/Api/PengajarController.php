<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenjangKelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class PengajarController extends Controller
{
    /**
     * Mendapatkan jenjang kelas dan kelas yang sesuai dengan akun pengajar
     */
    public function getJenjangDanKelas(): JsonResponse
    {
        $user = Auth::user();

        if (!$user || $user->id_role !== 3) {
            return response()->json([
                'success' => false,
                'message' => 'Akses hanya untuk pengajar.'
            ], 403);
        }

        if (!$user->jenjang_kelas_id) {
            return response()->json([
                'success' => false,
                'message' => 'Pengajar belum memiliki jenjang kelas.'
            ], 403);
        }

        $jenjang = JenjangKelas::with('classes')
                    ->find($user->jenjang_kelas_id);

        if (!$jenjang) {
            return response()->json([
                'success' => false,
                'message' => 'Jenjang kelas tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data jenjang dan kelas berhasil diambil.',
            'data' => [
                'jenjang_kelas' => [
                    'id' => $jenjang->id,
                    'nama_jenjang' => $jenjang->nama_jenjang,
                ],
                'classes' => $jenjang->classes->map(fn($class) => [
                    'id' => $class->id,
                    'class_name' => $class->class_name,
                    'total_student' => $class->total_student,
                ]),
            ]
        ]);
    }

    /**
     * Mendapatkan jadwal kelas (schedule) yang ada di jenjang kelas pengajar
     */
    public function getSchedules(): JsonResponse
    {
        $user = Auth::user();

        if (!$user || $user->id_role !== 3) {
            return response()->json([
                'success' => false,
                'message' => 'Akses hanya untuk pengajar.'
            ], 403);
        }

        if (!$user->jenjang_kelas_id) {
            return response()->json([
                'success' => false,
                'message' => 'Pengajar belum memiliki jenjang kelas.'
            ], 403);
        }

        $jenjang = JenjangKelas::with(['classes.schedules'])
                    ->find($user->jenjang_kelas_id);

        if (!$jenjang) {
            return response()->json([
                'success' => false,
                'message' => 'Jenjang kelas tidak ditemukan.'
            ], 404);
        }

        $schedules = [];

        foreach ($jenjang->classes as $class) {
            foreach ($class->schedules as $schedule) {
                $schedules[] = [
                    'class_id' => $class->id,
                    'class_name' => $class->class_name,
                    'schedule' => $schedule,
                ];
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Jadwal kelas berhasil diambil.',
            'data' => $schedules
        ]);
    }
}
