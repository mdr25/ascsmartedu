<?php

namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\BankSoal;
use Illuminate\Http\Request;

class BankSoalController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_materi' => 'required|string|max:45',
            'soal' => 'required|string',
            'materi' => 'required|string',
            'level' => 'required|in:Easy,Medium,Hard',
            'classes_id' => 'required|exists:classes,id',
            'is_free' => 'boolean'
        ]);

        $soal = BankSoal::create($validated);

        return response()->json(['message' => 'Bank soal berhasil ditambahkan', 'data' => $soal]);
    }

    public function update(Request $request, $id)
    {
        $soal = BankSoal::findOrFail($id);
        $soal->update($request->all());

        return response()->json(['message' => 'Bank soal berhasil diperbarui', 'data' => $soal]);
    }

    public function destroy($id)
    {
        $soal = BankSoal::findOrFail($id);
        $soal->delete();

        return response()->json(['message' => 'Bank soal berhasil dihapus']);
    }
}
