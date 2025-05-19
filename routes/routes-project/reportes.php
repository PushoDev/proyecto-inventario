<?php

use App\Http\Controllers\ReportesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('reportes')->name('reportes.')->group(function () {
        // Página principal del panel de reportes
        Route::get('/', [ReportesController::class, 'index'])->name('index');

        // Reporte: Productos Más Comprados
        Route::get('/productos-mas-comprados', [ReportesController::class, 'productosMasComprados'])
            ->name('productos_mas_comprados');

        // Reporte: Compras por Período
        Route::get('/compras-por-periodo', [ReportesController::class, 'comprasPorPeriodo'])
            ->name('compras_por_periodo');

        // Reporte: Balance Mensual
        Route::get('/balance-gastos-mensuales', [ReportesController::class, 'balanceGastosMensuales'])
            ->name('balance_gastos_mensuales');

        // Reporte: Compras por Proveedor
        Route::get('/compras-por-proveedor/{proveedorId?}', [ReportesController::class, 'comprasPorProveedor'])
            ->name('compras_por_proveedor');

        // Cantidad de Productos por Almacén
        Route::get('/productos-por-almacen', [ReportesController::class, 'productosPorAlmacen'])
            ->name('productos_por_almacen');

        // Lista detallada de productos por almacén
        Route::get('/productos-por-almacen-detalle', [ReportesController::class, 'productosPorAlmacenDetalle'])
            ->name('productos_por_almacen_detalle');
    });
});
