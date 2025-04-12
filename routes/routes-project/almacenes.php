<?php

use App\Http\Controllers\AlmacenController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('almacenes', AlmacenController::class);
    }
);
