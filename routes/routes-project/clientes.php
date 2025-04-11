<?php

use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('clientes', ClienteController::class);
    }
);
