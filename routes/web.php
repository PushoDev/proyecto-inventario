<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Routes Projects
    // Categorias
    require __DIR__ . '/routes-project/categorias.php';
    // Clientes
    require __DIR__ . '/routes-project/clientes.php';
    // Proveedores
    require __DIR__ . '/routes-project/proveedores.php';
    // Almacenes
    require __DIR__ . '/routes-project/almacenes.php';
    // Logistica
    require __DIR__ . '/routes-project/logistica.php';
    // cuentas
    require __DIR__ . '/routes-project/cuentas.php';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
