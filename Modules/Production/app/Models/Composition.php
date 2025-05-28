<?php

namespace Modules\Production\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\MatierePremiere;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Production\Database\Factories\CompositionFactory;

class Composition extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "mpc_id",
        "mp_id",
        "qte",
    ];

    // protected static function newFactory(): CompositionFactory
    // {
    //     // return CompositionFactory::new();
    // }

    // RelationShip
    
    public function mpc(): HasOne
    {
        return $this->hasOne(MatierePremiere::class);
    }

    public function matierePremieres():HasMany
    {
        return $this->hasMany(MatierePremiere::class);
    }
    
    


}
