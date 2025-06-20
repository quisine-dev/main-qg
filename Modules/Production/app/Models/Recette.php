<?php

namespace Modules\Production\Models;

use Modules\Production\Models\Produit;
use Illuminate\Database\Eloquent\Model;
use Modules\Production\Models\MatierePremiere;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
// use Modules\Production\Database\Factories\RecetteFactory;

class Recette extends Model
{
    use HasFactory;

    protected $fillable = ['produit_id'];

    public function matieres():BelongsToMany
    {
        return $this->belongsToMany(MatierePremiere::class, 'mp_recette', 'recette_id', 'mp_id')
                    ->withPivot('qte')
                    ->withTimestamps();
    }

    public function produit():BelongsTo
    {
        return $this->belongsTo(Produit::class);
    }
}
