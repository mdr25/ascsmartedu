<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $user->update($request->only(['name', 'email', 'phone_number', 'gender', 'address']));
        return response()->json(['message' => 'Profil berhasil diupdate', 'user' => $user]);
    }
}
