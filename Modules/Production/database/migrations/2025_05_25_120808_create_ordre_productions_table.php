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
        Schema::create('ordre_productions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mp_id')->constrained('matiere_premieres');
            $table->decimal('qte');
            $table->string('operateur');
            $table->string('statut');            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordre_productions');
    }
};
