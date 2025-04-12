<?php

use App\Http\Controllers\LogisticaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('logistica', LogisticaController::class);
    }
);
