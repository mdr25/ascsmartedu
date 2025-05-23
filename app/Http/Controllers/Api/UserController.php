<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePengajarRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserController extends Controller
{
    /**
     * Menampilkan semua data pengguna
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar semua pengguna.',
            'data' => $users
        ]);
    }

    /**
     * Menampilkan data pengguna berdasarkan ID
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Menyimpan data pengajar baru
     */
    public function storePengajar(StorePengajarRequest $request)
    {
        $data = $request->validated();

        // Set id_role sebagai pengajar (3)
        $data['id_role'] = 3; 

        $user = User::create([
            'nama'             => $data['nama'],
            'email'            => $data['email'],
            'password'         => Hash::make($data['password']),
            'id_role'          => $data['id_role'],          
            'jenjang_kelas_id' => $data['jenjang_kelas_id'] ?? null,
            'no_telepon'       => $data['no_telepon'] ?? null,
            'gender'           => $data['gender'] ?? null,
            'alamat'           => $data['alamat'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengajar berhasil ditambahkan.',
            'data'    => $user
        ], 201);
    }

    /**
     * Menampilkan daftar pengajar (id_role = 3)
     */
    /**
 * Menghapus akun pengguna (khusus role siswa dan pengajar)
 */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan.'
            ], 404);
        }

        // Cek jika user adalah admin (id_role = 1), tidak boleh dihapus
        if ($user->id_role == 1) {
            return response()->json([
                'success' => false,
                'message' => 'Akun admin tidak dapat dihapus.'
            ], 403);
        }

        // Hanya boleh hapus siswa (2) atau pengajar (3)
        if (!in_array($user->id_role, [2, 3])) {
            return response()->json([
                'success' => false,
                'message' => 'Hanya akun siswa atau pengajar yang dapat dihapus.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Akun berhasil dihapus.'
        ]);
    }

    /**
     * Memperbarui profil pengguna yang sedang login
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'nama'        => 'sometimes|string|max:100',
            'alamat'      => 'sometimes|string',
            'no_telepon'  => 'sometimes|string|min:10|max:15',
            'gender'      => 'sometimes|in:male,female',
            'email'       => 'sometimes|email|unique:users,email,' . $user->id,
            'password'    => 'sometimes|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // Jika ada password baru, hash dulu
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui.',
            'data'    => $user
        ]);
    }
}
