<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MateriController extends Controller
{
    public function index($babId)
    {
        $materi = Materi::where('bab_id', $babId)->get();
        return response()->json($materi);
    }

    public function store(Request $request, $babId)
    {
        $request->validate([
            'nama_materi' => 'required|string|max:255',
            'desc_materi' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240', // max 10MB
        ]);

        $filePath = null;

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('materi_files', 'public');
        }

        $materi = Materi::create([
            'nama_materi' => $request->nama_materi,
            'desc_materi' => $request->desc_materi,
            'bab_id' => $babId,
            'file_path' => $filePath,
        ]);

        return response()->json(['message' => 'Materi berhasil ditambahkan', 'data' => $materi], 201);
    }

    public function show($id)
    {
        $materi = Materi::findOrFail($id);
        return response()->json($materi);
    }

    public function update(Request $request, $id)
    {
        $materi = Materi::findOrFail($id);

        $request->validate([
            'nama_materi' => 'required|string|max:255',
            'desc_materi' => 'required|string',
            'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:10240', // file wajib diupload ulang
        ]);

        // Hapus file lama jika ada
        if ($materi->file_path && Storage::disk('public')->exists($materi->file_path)) {
            Storage::disk('public')->delete($materi->file_path);
        }

        // Simpan file baru
        $filePath = $request->file('file')->store('materi_files', 'public');

        // Update data materi
        $materi->update([
            'nama_materi' => $request->nama_materi,
            'desc_materi' => $request->desc_materi,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'message' => 'Materi berhasil diperbarui',
            'data' => $materi
        ]);
    }


    public function downloadFile($id)
    {
        $materi = Materi::findOrFail($id);

        if (!$materi->file_path || !Storage::disk('public')->exists($materi->file_path)) {
            return response()->json(['message' => 'File tidak ditemukan'], 404);
        }

        return response()->download(storage_path('app/public/' . $materi->file_path));
    }

    public function destroy($id)
    {
        $materi = Materi::findOrFail($id);

        if ($materi->file_path && Storage::disk('public')->exists($materi->file_path)) {
            Storage::disk('public')->delete($materi->file_path);
        }

        $materi->delete();

        return response()->json(['message' => 'Materi berhasil dihapus']);
    }
}
