<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    // Ambil semua data
    public function index()
    {
        return response()->json(Role::all());
    }

    // Tambah data baru
    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json(["message" => "Success", "data" => $role]);
    }

    // Ambil data berdasarkan ID
    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(["message" => "Role not found"], 404);
        }
        return response()->json($role);
    }

    // Update data berdasarkan ID
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(["message" => "Role not found"], 404);
        }
        $role->update($request->all());
        return response()->json(["message" => "Update Success", "data" => $role]);
    }

    // Hapus data berdasarkan ID
    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(["message" => "Role not found"], 404);
        }
        $role->delete();
        return response()->json(["message" => "Delete Success"]);
    }
}
