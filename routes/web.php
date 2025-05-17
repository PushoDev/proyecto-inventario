<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // Calcular la inversión total (precio_compra_producto * cantidad_producto)
        $inversionTotal = DB::table('productos')
            ->select(DB::raw('SUM(precio_compra_producto * cantidad_producto) as total_inversion'))
            ->value('total_inversion'); // Obtiene el valor calculado
        // Calcular el Saldo de las Cuentas
        $saldoCuentas = DB::table('cuentas')
            ->sum('saldo_cuenta');

        // Total de Monto del Negocio tanto invertido como en las cuentas
        $montoGeneralInvertido = ($saldoCuentas ?? 0) + ($inversionTotal ?? 0);

        return Inertia::render('dashboard', [
            'montoGeneralInvertido' => $montoGeneralInvertido,
        ]);
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
    // Movimientos
    require __DIR__ . '/routes-project/movimientos.php';
    // Logistica
    require __DIR__ . '/routes-project/logistica.php';
    // cuentas
    require __DIR__ . '/routes-project/cuentas.php';
    // Productos
    require __DIR__ . '/routes-project/productos.php';
    // Reportes
    require __DIR__ . '/routes-project/reportes.php';

    // Comprar
    require __DIR__ . '/acciones/comprar.php';
    // Seleccionar
    require __DIR__ . '/acciones/seleccionarcomprar.php';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
