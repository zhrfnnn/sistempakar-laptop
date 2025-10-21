<?php

namespace App\Http\Controllers;

use App\Models\Laptop;
use Illuminate\Http\Request;

class LaptopController extends Controller
{
    // GET /api/laptops
    public function index()
    {
        return response()->json(Laptop::all());
    }

    // POST /api/laptops
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'harga' => 'required|integer',
            'spesifikasi' => 'nullable|string',
            'alasan' => 'nullable|string',
        ]);

        $laptop = Laptop::create($validated);
        return response()->json($laptop, 201);
    }

    // GET /api/laptops/{id}
    public function show($id)
    {
        $laptop = Laptop::find($id);
        if (!$laptop) {
            return response()->json(['message' => 'Laptop not found'], 404);
        }
        return response()->json($laptop);
    }

    // PUT /api/laptops/{id}
    public function update(Request $request, $id)
    {
        $laptop = Laptop::find($id);
        if (!$laptop) {
            return response()->json(['message' => 'Laptop not found'], 404);
        }

        $laptop->update($request->all());
        return response()->json($laptop);
    }

    // DELETE /api/laptops/{id}
    public function destroy($id)
    {
        $deleted = Laptop::destroy($id);
        if (!$deleted) {
            return response()->json(['message' => 'Laptop not found'], 404);
        }
        return response()->json(['message' => 'Laptop deleted']);
    }

    public function getRecommendation(Request $request)
    {
        $min = $request->input('min_harga');
        $max = $request->input('max_harga');
        $alasan = $request->input('alasan');

        // Validasi sederhana
        if (!$min || !$max) {
            return response()->json([
                'message' => 'min_harga, max_harga, dan alasan wajib diisi'
            ], 400);
        }

        // Query rekomendasi sederhana
        $query = Laptop::query()
            ->whereBetween('harga', [$min, $max])
            ->where('alasan', 'LIKE', "%{$alasan}%")
            ->get();

        return response()->json($query);
    }

}
