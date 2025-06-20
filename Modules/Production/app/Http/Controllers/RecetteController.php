<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Production\Models\Produit;
use Modules\Production\Models\Recette;
use Modules\Production\Models\MatierePremiere;

class RecetteController extends Controller
{
    /**
     * Liste toutes les recettes avec leurs relations.
     */
    public function index()
    {
        return Inertia::render('production/recette', [
            'recettes' => Recette::with(['produit', 'matieres'])->get(),
            'produits' => Produit::all(),
            'matieres' => MatierePremiere::all(),
        ]);
    }

    /**
     * Stocke une nouvelle recette.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'composants' => 'required|array|min:1',
            'composants.*.mp_id' => 'required|exists:matiere_premieres,id',
            'composants.*.qte' => 'required|numeric|min:0',
        ]);

        $recette = Recette::create([
            'produit_id' => $validated['produit_id'],
        ]);

        // Sync des matières premières avec les quantités
        $pivotData = collect($validated['composants'])
            ->mapWithKeys(fn ($comp) => [
                $comp['mp_id'] => ['qte' => $comp['qte']]
            ])
            ->toArray();

        $recette->matieres()->sync($pivotData);

        return redirect()->back();
    }

    /**
     * Met à jour une recette existante.
     */
    public function update(Request $request, $id)
    {
        $recette = Recette::findOrFail($id);

        $validated = $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'composants' => 'required|array|min:1',
            'composants.*.mp_id' => 'required|exists:matiere_premieres,id',
            'composants.*.qte' => 'required|numeric|min:0',
        ]);

        $recette->update([
            'produit_id' => $validated['produit_id'],
        ]);

        // Sync des matières premières avec les quantités
        $pivotData = collect($validated['composants'])
            ->mapWithKeys(fn ($comp) => [
                $comp['mp_id'] => ['qte' => $comp['qte']]
            ])
            ->toArray();

        $recette->matieres()->sync($pivotData);

        return redirect()->back();
    }

    /**
     * Supprime une recette.
     */
    public function destroy($id)
    {
        $recette = Recette::findOrFail($id);
        $recette->delete();

        return redirect()->back();
    }
}
