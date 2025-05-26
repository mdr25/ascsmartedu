<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{User, Role};
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    // GET: Lihat semua user + role-nya
    public function index(Request $request)
    {
        $query = User::with('role');

        if ($request->has('role')) {
            $query->whereHas('role', function ($q) use ($request) {
                $q->where('name_role', $request->role);
            });
        }

        $users = $query->get();

        return response()->json($users);
    }

    // PUT: Ubah role user
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'roles_id' => 'required|exists:roles,id'
        ]);

        $user = User::findOrFail($id);
        $user->roles_id = $request->roles_id;
        $user->save();

        return response()->json([
            'message' => 'Role user berhasil diperbarui',
            'user' => $user->load('role')
        ]);
    }

    // GET: Semua role (buat dropdown UI)
    public function allRoles()
    {
        return response()->json(Role::all(['id', 'name_role']));
    }
}
