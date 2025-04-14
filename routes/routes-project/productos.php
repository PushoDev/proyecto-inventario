<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('productos', function () {
    return Inertia::render('productos/index');
})->name('productos');

// Route::middleware(['auth', 'verified'])->group(
//     function () {
//         Route::resource('proveedores', ProveedorController::class);
//     }
// );
