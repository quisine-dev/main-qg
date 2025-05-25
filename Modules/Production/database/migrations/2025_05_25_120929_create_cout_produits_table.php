<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cout_produits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produit_id')->constrained('produits');
            $table->decimal('charge_variable');
            $table->decimal('charge_fixe');
            $table->decimal('cout_total');
            $table->decimal('marge');
            $table->decimal('prix_vente_ht');
            $table->decimal('tva');
            $table->decimal('prix_vente_ttc');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cout_produits');
    }
};
