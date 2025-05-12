<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportesController extends Controller
{
    /**
     * Inicio de los Reportes
     *
     * @return void
     */
    public function index()
    {
        return Inertia::render('reportes/index');
    }
    /**
     * Obtener los productos mas comprados.
     */
    public function productosMasComprados()
    {
        $productos = DB::table('compra_producto')
            ->join('productos', 'compra_producto.producto_id', '=', 'productos.id')
            ->select(
                'productos.nombre_producto',
                DB::raw('SUM(compra_producto.cantidad) as total_cantidad'),
                DB::raw('COUNT(compra_producto.compra_id) as veces_comprado')
            )
            ->groupBy('productos.id', 'productos.nombre_producto')
            ->orderByDesc('total_cantidad')
            ->take(10)
            ->get();

        return Inertia::render('reportes/ProductosMasComprados', [
            'productos' => $productos,
        ]);
    }
    /**
     * Compras por Periodo
     */
    public function comprasPorPeriodo(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'proveedor_id' => 'nullable|exists:proveedors,id',
        ]);

        $query = DB::table('compras')
            ->join('proveedors', 'compras.proveedor_id', '=', 'proveedors.id')
            ->select(
                'compras.id',
                'compras.fecha_compra',
                'compras.total_compra',
                'proveedors.nombre_proveedor',
                'compras.tipo_compra'
            );

        if ($request->filled('start_date')) {
            $query->whereDate('compras.fecha_compra', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('compras.fecha_compra', '<=', $request->end_date);
        }

        if ($request->filled('proveedor_id')) {
            $query->where('compras.proveedor_id', $request->proveedor_id);
        }

        $compras = $query->orderByDesc('compras.fecha_compra')->get();

        return Inertia::render('reportes/CompraPorPeriodo', [
            'compras' => $compras,
        ]);
    }

    /**
     * Balance Mensual
     */
    public function balanceGastosMensuales()
    {
        $gastos = DB::table('compras')
            ->select(
                DB::raw("DATE_FORMAT(compras.fecha_compra, '%Y-%m') as mes_anio"),
                DB::raw('SUM(compras.total_compra) as total'),
                DB::raw('COUNT(compras.id) as cantidad_compras')
            )
            ->groupBy('mes_anio')
            ->orderByDesc('mes_anio')
            ->get();

        return Inertia::render('reportes/BalanceGastosMensauales', [
            'gastos' => $gastos,
        ]);
    }

    /**
     * Compras por Proveedor
     */
    public function comprasPorProveedor($proveedorId = null)
    {
        $query = DB::table('compras')
            ->join('proveedors', 'compras.proveedor_id', '=', 'proveedors.id')
            ->select(
                'compras.id',
                'compras.fecha_compra',
                'compras.total_compra',
                'compras.tipo_compra'
            );

        if ($proveedorId) {
            $query->where('compras.proveedor_id', $proveedorId);
        }

        $compras = $query->orderByDesc('compras.fecha_compra')->get();
        $proveedor = $proveedorId
            ? DB::table('proveedors')->find($proveedorId)
            : null;

        return Inertia::render('reportes/ComprasPorProveedor', [
            'compras' => $compras,
            'proveedor' => $proveedor,
        ]);
    }
}
