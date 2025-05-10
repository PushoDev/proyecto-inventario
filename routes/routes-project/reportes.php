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
    });
});
