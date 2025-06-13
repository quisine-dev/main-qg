<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Production\Models\Produit;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = Produit::all();
        return Inertia::render('production/produit', ['produits'=>$produits]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('production::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'unite' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $produit = Produit::create([
            'nom'=>$validated['nom'],
            'desc'=>$validated['desc'],
            'unite'=>$validated['unite'],
        ]);

        // Ajout de l’image avec Spatie
        // if ($request->hasFile('photo')) {
        //     $produit->addMediaFromRequest('photo')->toMediaCollection('images');
        // }

        return redirect()->route('production.produit.index')->with('success', 'Produit ajouté avec succès.');

    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('production::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('production::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'unite' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $produit = Produit::findOrFail($id);

        $produit->update([
            'nom' => $validated['nom'],
            'desc' => $validated['desc'],
            'unite' => $validated['unite'],
        ]);
        return redirect()->route('production.produit.index')->with('success', 'Produit mis à jour avec succès.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();
        return redirect()->route('production.produit.index')->with('success', 'Produit supprimé avec succès.');
    }

}
