<?php

namespace Modules\Production\Models;

use Modules\Production\Models\Produit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Production\Database\Factories\CoutProduitFactory;

class CoutProduit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): CoutProduitFactory
    // {
    //     // return CoutProduitFactory::new();
    // }

    public function produit(): HasOne
    {
        return $this->hasOne(Produit::class);
    }
}
