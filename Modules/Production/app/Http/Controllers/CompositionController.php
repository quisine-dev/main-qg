<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Modules\Production\Models\Composition;
use Modules\Production\Models\MatierePremiere;

class CompositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mpcs = MatierePremiere::where('type','MPC')->get();
        $mps = MatierePremiere::where('type','MP')->get();

        $compositions = Composition::with('matierePremieres','mpc')->get();
        // dd($compositions->toArray());
        return Inertia::render('production/composition',[
            'mpcs'=>$mpcs, 
            'mps'=>$mps, 
            'compositions'=>$compositions]);
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
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'mpc_id' => 'required|exists:matiere_premieres,id',
    //         'composants' => 'required|array|min:1',
    //         'composants.*.mp_id' => 'required|exists:matiere_premieres,id|different:mpc_id',
    //         'composants.*.qte' => 'required|numeric|min:0.01',
    //     ]);

    //     DB::beginTransaction();

    //     try {
    //         foreach ($validated['composants'] as $composant) {
    //             Composition::create([
    //                 'mpc_id' => $validated['mpc_id'],
    //                 'mp_id' => $composant['mp_id'],
    //                 'qte' => $composant['qte'],
    //             ]);
    //         }

    //         DB::commit();

    //         return back()->with('success', 'Composition enregistrée avec succès.');
    //     } catch (\Exception $e) {
    //         DB::rollBack();

    //         return back()->withErrors(['error' => 'Une erreur est survenue : ' . $e->getMessage()]);
    //     }
    // }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mpc_id' => 'required|exists:matiere_premieres,id',
            'composants' => 'required|array|min:1',
            'composants.*.mp_id' => 'required|exists:matiere_premieres,id|different:mpc_id',
            'composants.*.qte' => 'required|numeric|min:0.01',
        ]);

        DB::beginTransaction();

        try {
            // 1. Créer la composition principale
            $composition = Composition::create([
                'mpc_id' => $validated['mpc_id'],
                // ajouter d'autres champs si besoin
            ]);

            // 2. Attacher les matières premières via la relation many-to-many
            // Ici on prépare un tableau mp_id => ['qte' => valeur]
            $attachData = [];
            foreach ($validated['composants'] as $composant) {
                $attachData[$composant['mp_id']] = ['qte' => $composant['qte']];
            }

            $composition->matierePremieres()->attach($attachData);

            DB::commit();

            return back()->with('success', 'Composition enregistrée avec succès.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Une erreur est survenue : ' . $e->getMessage()]);
        }
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
