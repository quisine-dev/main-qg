<?php

namespace Modules\Production\Models;

use Modules\Production\Models\Produit;
use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\MatierePremiere;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
// use Modules\Production\Database\Factories\RecetteFactory;

class Recette extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "produit_id",
        "qte"
    ];

    // protected static function newFactory(): RecetteFactory
    // {
    //     // return RecetteFactory::new();
    // }
    public function matieresPremieres(): BelongsToMany
    {
        return $this->belongsToMany(MatierePremiere::class);
    }

    public function produit(): HasOne
    {
        return $this->hasOne(Produit::class);
    }
}
