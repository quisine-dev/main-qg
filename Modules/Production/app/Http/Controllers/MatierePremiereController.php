<?php

namespace Modules\Production\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Production\Models\MatierePremiere;

class MatierePremiereController extends Controller
{
    public function index()
    {
        $mps = MatierePremiere::with('ingredients')->get();
        return Inertia::render('production/mp', [
            'mps' => $mps
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|in:simple,composite',
            'unite' => 'required|string|max:50',
            'prix_unitaire' => 'required|numeric|min:0',
            'composants' => 'nullable|array',
            'composants.*.mp_id' => 'required_with:composants|exists:matiere_premieres,id',
            'composants.*.qte' => 'required_with:composants|numeric|min:0.01',
        ]);

        // Création de la matière première
        $mp = MatierePremiere::create($validated);

        // Si c’est une matière composite, attacher les composants
        if ($mp->type === 'composite' && isset($validated['composants'])) {
            $composants = collect($validated['composants'])->mapWithKeys(function ($comp) {
                return [$comp['mp_id'] => ['quantite' => $comp['qte']]];
            });
            $mp->ingredients()->attach($composants);
        }

        return redirect()->route('production.mp.index')->with('success', 'Matière première ajoutée avec succès.');
    }

    public function update(Request $request, $id)
    {
        $mp = MatierePremiere::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|in:simple,composite',
            'unite' => 'required|string|max:50',
            'prix_unitaire' => 'required|numeric|min:0',
            'composants' => 'nullable|array',
            'composants.*.mp_id' => 'required_with:composants|exists:matiere_premieres,id',
            'composants.*.qte' => 'required_with:composants|numeric|min:0.01',
        ]);

        $mp->update($validated);

        if ($mp->type === 'composite') {
            $composants = collect($validated['composants'])->mapWithKeys(function ($comp) {
                return [$comp['mp_id'] => ['quantite' => $comp['qte']]];
            });

            $mp->ingredients()->sync($composants);
        } else {
            $mp->ingredients()->detach();
        }

        return redirect()->route('production.mp.index')->with('success', 'Matière première mise à jour.');
    }

    public function destroy($id)
    {
        $mp = MatierePremiere::findOrFail($id);

        // Supprimer les relations si c’est une composite
        $mp->ingredients()->detach();

        $mp->delete();

        return redirect()->route('production.mp.index')->with('success', 'Matière supprimée.');
    }
}
