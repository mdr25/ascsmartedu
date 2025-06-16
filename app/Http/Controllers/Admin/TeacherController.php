<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class TeacherController extends Controller
{
    public function index()
    {
        try {
            // Ambil semua user yang memiliki relasi role dengan nama 'Pengajar'
            $teachers = User::whereHas('role', function ($query) {
                $query->where('name_role', 'Pengajar');
            })->get();

            return response()->json($teachers);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data pengajar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
