<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Production\Models\MatierePremiere;

class MatierePremiereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mps = MatierePremiere::paginate(10);
        // dd($mp);
        return Inertia::render('production/mp', ['mps'=>$mps]);
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
    public function store(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'unite' => 'required|string|max:50',
            'prix_unitaire' => 'required|numeric|min:0',
        ]);

        // Création de la matière première
        MatierePremiere::create($validated);

        // Redirection ou réponse à gérer dans ta logique
        return redirect()->route('production.mp.index')->with('success', 'Matière première ajoutée avec succès.');
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
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
