<?php

use App\Http\Controllers\acciones\SelectController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::prefix('compras')->name('compras')->group(function () {
            Route::get('/almacenes', [SelectController::class, 'getAlmacen']);
            Route::get('/proveedores', [SelectController::class, 'getProveedor']);
            Route::get('/categorias', [SelectController::class, 'getCategorias']);
        });
    }
);
