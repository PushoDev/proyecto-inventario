<?php

use App\Http\Controllers\ProveedorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('proveedores', ProveedorController::class)
            ->parameters([
                'proveedores' => 'proveedor',
            ]);
    }
);
