<?php

namespace Modules\Production\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\MatierePremiere;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// use Modules\Production\Database\Factories\CompositionFactory;

class Composition extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "mpc_id",
    ];

    // protected static function newFactory(): CompositionFactory
    // {
    //     // return CompositionFactory::new();
    // }

    // RelationShip
    
    public function mpc(): BelongsTo
    {
        return $this->belongsTo(MatierePremiere::class,'mpc_id');
    }

    public function matierePremieres(): BelongsToMany
    {
        return $this->belongsToMany(
            MatierePremiere::class,
            'composition_matiere_premiere',  // nom de la table pivot
            'composition_id',                // clé étrangère locale
            'matiere_premiere_id'            // clé étrangère liée
        )->withPivot('qte');                 // pour inclure la quantité dans les résultats
    }

    
    


}
