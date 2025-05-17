<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('movimientos', function () {
    return Inertia::render('movimientos/index');
})->name('movimientos');

Route::middleware(['auth', 'verified'])->group(
    function () {
        // Route::resource('almacenes', AlmacenController::class);
    }
);
