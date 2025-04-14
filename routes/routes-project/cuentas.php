<?php

use App\Http\Controllers\CuentaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('cuentas', CuentaController::class);
    }
);
