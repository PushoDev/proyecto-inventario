<?php


use App\Http\Controllers\CompraController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(
    function () {
        Route::resource('comprar', CompraController::class);
    }
);
