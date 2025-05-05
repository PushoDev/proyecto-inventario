<?php

use App\Http\Controllers\acciones\SelectController;
use App\Http\Controllers\CompraController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::prefix('compras')->name('compras')->group(function () {
            // Rutas para los Select
            Route::get('/almacenes', [SelectController::class, 'getAlmacen']);
            Route::get('/proveedores', [SelectController::class, 'getProveedor']);
            Route::get('/categorias', [SelectController::class, 'getCategorias']);

            // Ruta para obtener cuentas
            Route::get('/cuentas', [SelectController::class, 'getCuentas']);

            // Rutas para cargar datos iniciales
            Route::get('/datos', [CompraController::class, 'cargarDatos'])->name('compras.datos');
            Route::post('/registrar', [CompraController::class, 'registrarCompra'])->name('compras.registrar');
        });
    }
);
