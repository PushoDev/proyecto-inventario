<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('movimientos', function () {
    return Inertia::render('movimientos/index');
})->name('movimientos');
