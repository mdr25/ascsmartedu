<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = User::whereHas(
            'role',
            fn($q) =>
            $q->where('name_role', 'Pengajar')
        )->get();

        return response()->json($teachers);
    }
}
