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
            $table->foreignId('mpc_id')->constrained('matiere_premieres');
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
