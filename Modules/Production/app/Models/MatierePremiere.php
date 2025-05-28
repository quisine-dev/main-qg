<?php

namespace Modules\Production\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\Composition;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// use Modules\Production\Database\Factories\MatierePremiereFactory;

class Matiere_Premiere extends Model
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
   
    public function composition():BelongsTo
    {
        return $this->belongsTo(Composition::class);
    }
    public function ordreProduction():BelongsTo
    {
        return $this->belongsTo(OrdreProduction::class);
    }
}
