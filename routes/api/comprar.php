<?php

use App\Http\Controllers\api\CompraController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::prefix('compras')->name('compras')->group(function () {
            Route::get('/almacenes', [CompraController::class, 'getAlmacen']);
            Route::get('/proveedores', [CompraController::class, 'getProveedor']);
            Route::get('/categorias', [CompraController::class, 'getCategorias']);
        });
    }
);
