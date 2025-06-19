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
        Schema::create('compositions', function (Blueprint $table) {
            $table->id();
        
            // La matière première composite (ex : pain)
            $table->foreignId('matiere_premiere_composite_id')->constrained('matiere_premieres');
        
            // L’ingrédient dans la composition (ex : farine)
            $table->foreignId('matiere_premiere_id')->constrained('matiere_premieres');
        
            // Quantité utilisée
            $table->decimal('quantite', 10, 2);
        
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.P
     */
    public function down(): void
    {
        Schema::dropIfExists('compositions');
    }
};
