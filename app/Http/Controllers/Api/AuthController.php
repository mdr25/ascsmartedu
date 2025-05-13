<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login untuk semua role (admin, siswa, pengajar)
     */
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'errors' => $validator->errors()
            ], 400));
        }

        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();
            $token = $user->createToken('api_token')->plainTextToken;

            return response()->json([
                'message' => 'Login berhasil',
                'token'   => $token,
                'user'    => $user
            ], 200);
        }

        throw new HttpResponseException(response()->json([
            'error' => ['message' => 'Email atau password salah']
        ], 401));
    }

    /**
     * Register khusus untuk siswa
     */
    public function register(Request $request)
    {
        $request->validate([
            'nama'        => 'required|string|max:100',
            'alamat'      => 'required|string',
            'no_telepon'  => 'required|string|min:10|max:15',
            'email'       => 'required|email|unique:users,email',
            'password'    => 'required|string|min:6',
            'gender'      => 'required|in:male,female',
        ]);

        try {
            $user = User::create([
                'nama'        => $request->nama,
                'alamat'      => $request->alamat,
                'no_telepon'  => $request->no_telepon,
                'email'       => $request->email,
                'password'    => Hash::make($request->password),
                'gender'      => $request->gender,
                'id_role'     => 2, // siswa
            ]);

            return response()->json([
                'message' => 'Register berhasil',
                'user'    => $user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Register gagal, coba lagi!',
                'error'   => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Logout & revoke token
     */
    public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}

}
