<?php

use Illuminate\Support\Facades\Route;
use Modules\Production\Http\Controllers\CompositionController;
use Modules\Production\Http\Controllers\CoutProduitController;
use Modules\Production\Http\Controllers\MatierePremiereController;
use Modules\Production\Http\Controllers\OrdreProductionController;
use Modules\Production\Http\Controllers\ProductionController;
use Modules\Production\Http\Controllers\ProduitController;
use Modules\Production\Http\Controllers\RecetteController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('productions', ProductionController::class)->names('production');
});

// Production
Route::prefix('production')->name('production.')->group(function () {
    Route::resource('composition', CompositionController::class)->except(['show']);
    Route::resource('mp', MatierePremiereController::class)->except(['show']);
    Route::resource('recette', RecetteController::class)->except(['show']);
    Route::resource('produit', ProduitController::class)->except(['show']);
    Route::resource('ordre-production', OrdreProductionController::class)->except(['show']);
    Route::resource('cout-production', CoutProduitController::class)->except(['show']);
});

