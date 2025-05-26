<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPackage;
use Illuminate\Http\Request;

class SubscriptionPackageController extends Controller
{
    public function index()
    {
        return response()->json(SubscriptionPackage::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1', // asumsi dalam hari/bulan
        ]);

        $package = SubscriptionPackage::create($validated);

        return response()->json([
            'message' => 'Paket langganan berhasil dibuat',
            'data' => $package
        ], 201);
    }

    public function show($id)
    {
        $package = SubscriptionPackage::find($id);

        if (!$package) {
            return response()->json(['message' => 'Paket tidak ditemukan'], 404);
        }

        return response()->json($package);
    }

    public function update(Request $request, $id)
    {
        $package = SubscriptionPackage::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|integer|min:1',
        ]);

        $package->update($validated);

        return response()->json([
            'message' => 'Paket langganan berhasil diperbarui',
            'data' => $package
        ]);
    }

    public function destroy($id)
    {
        $package = SubscriptionPackage::find($id);

        if (!$package) {
            return response()->json(['message' => 'Paket tidak ditemukan'], 404);
        }

        $package->delete();

        return response()->json(['message' => 'Paket langganan berhasil dihapus']);
    }
}
