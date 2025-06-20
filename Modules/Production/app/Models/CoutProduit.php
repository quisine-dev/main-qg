<?php

namespace Modules\Production\Models;

// Assurez-vous d'utiliser le bon namespace pour Produit si ce n'est pas dans le même dossier
// Si Produit est dans App\Models, utilisez: use App\Models\Produit;
// Si Produit est dans Modules\Production\Models, laissez tel quel ou assurez-vous qu'il est implicitement accessible.
// Pour la sécurité, il est toujours bon d'importer explicitement:
use App\Models\Produit; // <-- Assurez-vous que c'est le bon chemin pour votre modèle Produit

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Changé de HasOne à BelongsTo
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Production\Database\Factories\CoutProduitFactory; // Décommenter si vous utilisez une factory

class CoutProduit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Ces champs peuvent être assignés en masse via la méthode create() ou update().
     */
    protected $fillable = [
        'produit_id',
        'charge_variable',
        'charge_fixe',
        'cout_total',
        'marge',
        'prix_vente_ht',
        'tva',
        'prix_vente_ttc',
    ];

    // Si vous utilisez une factory, décommentez la méthode newFactory
    // protected static function newFactory(): CoutProduitFactory
    // {
    //     // return CoutProduitFactory::new();
    // }

    /**
     * Un CoutProduit appartient à un Produit.
     * C'est une relation inverse de 'hasOne' sur le modèle Produit.
     */
    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class);
    }
}
