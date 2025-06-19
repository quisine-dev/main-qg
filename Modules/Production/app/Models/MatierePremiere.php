<?php

namespace Modules\Production\Models;

use Modules\Production\Models\Recette;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// use Modules\Production\Database\Factories\MatierePremiereFactory;

class MatierePremiere extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "nom",
        "type",
        "unite",
        "prix_unitaire"
    ];

    // protected static function newFactory(): MatierePremiereFactory
    // {
    //     // return MatierePremiereFactory::new();
    // }

    public function ingredients()
    {
        return $this->belongsToMany(
            MatierePremiere::class,
            'compositions',
            'matiere_premiere_composite_id', // cette matière (composite)
            'matiere_premiere_id'            // ses ingrédients
        )->withPivot('quantite');
    }

    /**
     * Les matières premières composites dans lesquelles cette matière première est utilisée.
     */
    public function utiliseeDans()
    {
        return $this->belongsToMany(
            MatierePremiere::class,
            'compositions',
            'matiere_premiere_id',          // cette matière (simple)
            'matiere_premiere_composite_id' // les composites où elle est utilisée
        )->withPivot('quantite');
    }


    public function recettes(): BelongsToMany
    {
        return $this->belongsToMany(Recette::class);
    }

    public function ordresProduction(): HasMany
    {
        return $this->hasMany(OrdreProduction::class, 'mp_id');
    }
    


}
