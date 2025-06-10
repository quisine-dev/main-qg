<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Production\Models\MatierePremiere;
use Modules\Production\Models\OrdreProduction;

class OrdreProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mpcs = MatierePremiere::where('type','MPC')->get();
        $ordres = OrdreProduction::with('matierePremiere')->get();
        return Inertia::render('production/ordre-production',['mpcs'=>$mpcs,'ordres'=>$ordres]);
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
        $validated = $request->validate([
            'composants' => 'required|array|min:1',
            'composants.*.mp_id' => 'required|exists:matiere_premieres,id',
            'composants.*.qte' => 'required|numeric|min:0.01',
            'operateur' => 'required|string|max:255',
            'statut' => 'required|string|max:10',
        ]);

        foreach ($validated['composants'] as $composant) {
            OrdreProduction::create([
                'mp_id' => $composant['mp_id'],
                'qte' => $composant['qte'],
                'operateur' => $validated['operateur'],
                'statut' => $validated['statut'],
            ]);
        }

        return redirect()->route('production.ordre-production.index')->with('success', 'Ordre de Production ajoutée avec succès.');


        // return response()->json([
        //     'message' => 'Ordres de production enregistrés avec succès.'
        // ], 201);
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
