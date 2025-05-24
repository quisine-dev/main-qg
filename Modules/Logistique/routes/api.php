<?php

use Illuminate\Support\Facades\Route;
use Modules\Logistique\Http\Controllers\LogistiqueController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('logistiques', LogistiqueController::class)->names('logistique');
});
