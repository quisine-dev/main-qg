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
        Schema::create('composition_matiere_premiere', function (Blueprint $table) {
            $table->id();
            $table->foreignId('composition_id')->constrained();
            $table->foreignId('matiere_premiere_id')->constrained();
            $table->decimal('qte');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composition_matiere_premiere');
    }
};