<?php

namespace App\Http\Controllers;

use App\Models\BankSoal;
use Illuminate\Http\Request;

class BankSoalController extends Controller
{
    // Lihat semua soal
    public function index()
    {
        return response()->json(BankSoal::with('class')->get());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_materi' => 'required|string|max:45',
            'soal' => 'required|url|max:255',
            'materi' => 'required|string|max:255',
            'level' => 'required|in:Easy,Medium,Hard',
            'classes_id' => 'required|exists:classes,id',
        ]);

        $bankSoal = BankSoal::create($validatedData);

        return response()->json(['message' => 'Bank Soal Created', 'data' => $bankSoal]);
    }

    public function update(Request $request, $id)
    {
        $bankSoal = BankSoal::find($id);
        if (!$bankSoal) {
            return response()->json(['message' => 'Bank Soal not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_materi' => 'string|max:45',
            'soal' => 'url|max:255',
            'materi' => 'string|max:255',
            'level' => 'in:Easy,Medium,Hard',
            'classes_id' => 'exists:classes,id',
        ]);

        $bankSoal->update($validatedData);

        return response()->json(['message' => 'Bank Soal Updated', 'data' => $bankSoal]);
    }

    public function destroy($id)
    {
        $bankSoal = BankSoal::find($id);
        if (!$bankSoal) {
            return response()->json(['message' => 'Bank Soal not found'], 404);
        }

        $bankSoal->delete();
        return response()->json(['message' => 'Bank Soal Deleted']);
    }
}
