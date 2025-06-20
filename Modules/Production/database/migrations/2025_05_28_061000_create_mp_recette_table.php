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
        Schema::create('mp_recette', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recette_id')->constrained();
            $table->foreignId('mp_id')->constrained('matiere_premieres');
            $table->decimal('qte'); // Quantité utilisée dans la recette
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mp_recette');
    }
};
