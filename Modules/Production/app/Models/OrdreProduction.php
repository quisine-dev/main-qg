<?php

namespace Modules\Production\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\MatierePremiere;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// use Modules\Production\Database\Factories\OrdreProductionFactory;

class OrdreProduction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "mp_id",
        "qte",
        "operateur",
        "statut"
    ];

    // protected static function newFactory(): OrdreProductionFactory
    // {
    //     // return OrdreProductionFactory::new();
    // }

    public function matierePremieres():HasMany
    {
        return $this->hasMany(MatierePremiere::class);
    }
}
