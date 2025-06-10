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

    public function composition() : BelongsTo {
        return $this->belongsTo(Composition::class);
    }

    public function compositions() : BelongsToMany {
        return $this->belongsToMany(Composition::class);
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
