<?php

use Illuminate\Support\Facades\Route;
use Modules\Logistique\Http\Controllers\LogistiqueController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('logistiques', LogistiqueController::class)->names('logistique');
});
