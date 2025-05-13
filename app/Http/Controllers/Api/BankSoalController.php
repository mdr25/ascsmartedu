<?php

namespace App\Http\Controllers\Api;

use App\Models\BankSoal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BankSoalController extends Controller
{
    public function indexByLevel($level)
    {
        $soals = BankSoal::with('classModel')
            ->where('level', $level)
            ->get();

        if ($soals->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada soal ditemukan untuk level ini.',
                'data'    => []
            ], 200);
        }

        return response()->json([
            'message' => 'Daftar soal ditemukan.',
            'data'    => $soals
        ], 200);
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_materi' => 'required|string|max:255',
            'soal'        => 'required|string',
            'materi'      => 'required|string',
            'level'       => 'required|string|in:easy,medium,hard',
            'classes_id'  => 'required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $bankSoal = BankSoal::create($request->all());

        return response()->json([
            'message' => 'Soal berhasil ditambahkan.',
            'data'    => $bankSoal
        ], 201);
    }

    
    public function update(Request $request, $id)
    {
        $bankSoal = BankSoal::find($id);

        if (!$bankSoal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_materi' => 'sometimes|required|string|max:255',
            'soal'        => 'sometimes|required|string',
            'materi'      => 'sometimes|required|string',
            'level'       => 'sometimes|required|string|in:easy,medium,hard',
            'classes_id'  => 'sometimes|required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $bankSoal->update($request->all());

        return response()->json([
            'message' => 'Soal berhasil diperbarui.',
            'data'    => $bankSoal
        ], 200);
    }

    
    public function destroy($id)
    {
        $bankSoal = BankSoal::find($id);

        if (!$bankSoal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        $bankSoal->delete();

        return response()->json(['message' => 'Soal berhasil dihapus.'], 200);
    }
}
