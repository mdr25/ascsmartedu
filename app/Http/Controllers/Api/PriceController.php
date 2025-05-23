<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Price;
use Illuminate\Http\Request;

class PriceApiController extends Controller
{
    
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Price::all()
        ]);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ]);

        $price = Price::create($request->only('amount', 'description'));

        return response()->json([
            'success' => true,
            'message' => 'Harga berhasil ditambahkan',
            'data' => $price
        ], 201);
    }

    
    public function show($id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $price
        ]);
    }

    
    public function update(Request $request, $id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ]);

        $price->update($request->only('amount', 'description'));

        return response()->json([
            'success' => true,
            'message' => 'Harga berhasil diperbarui',
            'data' => $price
        ]);
    }

    
    public function destroy($id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $price->delete();

        return response()->json([
            'success' => true,
            'message' => 'Harga berhasil dihapus'
        ]);
    }
}
