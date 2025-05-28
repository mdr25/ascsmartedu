<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'phone_number' => 'required|string|max:15',
                'gender' => 'required|in:M,F',
                'address' => 'required|string|max:255',
                // 'roles_id' dihapus dari validasi user biasa!
            ]);

            // Cari id role siswa
            $roleSiswaId = Role::where('name_role', 'Siswa')->first()->id;

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'phone_number' => $validatedData['phone_number'],
                'gender' => $validatedData['gender'],
                'address' => $validatedData['address'],
                'roles_id' => $roleSiswaId, // Set otomatis
            ]);

            return response()->json(['message' => 'Register Success']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Register Failed', 'error' => $e->getMessage()], 400);
        }
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Login Success', 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout Success']);
    }
}
