<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Bab, Subbab, Konten};
use Illuminate\Http\Request;

class KontenOrderController extends Controller
{
    public function updateBabOrder(Request $request)
    {
        foreach ($request->order as $item) {
            Bab::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Urutan Bab berhasil diperbarui']);
    }

    public function updateSubbabOrder(Request $request)
    {
        foreach ($request->order as $item) {
            Subbab::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Urutan Subbab berhasil diperbarui']);
    }

    public function updateKontenOrder(Request $request)
    {
        foreach ($request->order as $item) {
            Konten::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Urutan Konten berhasil diperbarui']);
    }
}
