<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('reportes', function () {
    return Inertia::render('reportes/index');
})->name('reportes');
