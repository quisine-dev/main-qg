<?php

namespace Modules\Production\Models;

use Modules\Production\Models\Recette;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Production\Database\Factories\ProduitFactory;

class Produit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "nom",
        "desc",
        "unite",
    ];

    // protected static function newFactory(): ProduitFactory
    // {
    //     // return ProduitFactory::new();
    // }
    public function recette(): BelongsTo
    {
        return $this->belongsTo(Recette::class);
    }
}
