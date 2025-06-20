<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();

        // Validasi input
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|max:255',
            'phone_number' => 'string|max:20',
            'gender' => 'in:M,F',
            'address' => 'nullable|string',
            'password' => 'nullable|string|min:6', // password opsional
        ]);

        // Hash password jika diisi
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']); // Jangan update password kalau kosong
        }

        // Simpan perubahan
        $user->update($validated);

        return response()->json([
            'message' => 'Profil berhasil diupdate',
            'user' => $user,
        ]);
    }
}
