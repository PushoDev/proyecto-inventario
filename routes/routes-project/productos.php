<?php

use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('productos', ProductoController::class);
    }
);
