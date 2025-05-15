<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class LogisticaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Contar el total de categorías
        $totalCategorias = DB::table('categorias')->count();

        // Contar solo las categorías activas
        $categoriasActivas = DB::table('categorias')
            ->where('activar_categoria', true)
            ->count();

        // Contar el total de proveedores
        $totalProveedores = DB::table('proveedors')->count();

        // Contar el total de clientes
        $totalClientes = DB::table('clientes')->count();

        // Contar el total de productos
        $totalProductos = DB::table('productos')->count();

        // Calcular el total de unidades de productos
        $totalUnidades = DB::table('productos')
            ->sum('cantidad_producto'); // Suma directamente la columna 'cantidad_producto'

        // Calcular la inversión total (precio_compra_producto * cantidad_producto)
        $inversionTotal = DB::table('productos')
            ->select(DB::raw('SUM(precio_compra_producto * cantidad_producto) as total_inversion'))
            ->value('total_inversion'); // Obtiene el valor calculado

        // Contar Cuentas Monetarias Registradas
        $totalCuentas = DB::table('cuentas')->count();

        // Calcular el Saldo de las Cuentas
        $saldoCuentas = DB::table('cuentas')
            ->sum('saldo_cuenta');

        // Total de Monto del Negocio tanto invertido como en las cuentas
        $montoGeneralInvertido = ($saldoCuentas ?? 0) + ($inversionTotal ?? 0);

        // Total de Deudas a Proveedores
        $deudaPendietesSaldo = DB::table('cuentas')
            ->sum('deuda');

        // Contar deudas Pendietes
        $deudaPendientes = DB::table('compras')
            ->where('tipo_compra', 'deuda_proveedor')
            ->count();

        // Datos Charts
        // Reporte: Gastos Mensuales
        $gastosMensuales = DB::table('compras')
            ->select(
                DB::raw("DATE_FORMAT(compras.fecha_compra, '%Y-%m') as mes_anio"),
                DB::raw('SUM(compras.total_compra) as total'),
                DB::raw('COUNT(compras.id) as cantidad_compras')
            )
            ->groupBy('mes_anio')
            ->orderByDesc('mes_anio')
            ->get();
        // Reporte: Productos mas Comprados
        $productosTop = DB::table('compra_producto')
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
        // Reporte: Compras por Proveedor
        $comprasPorProveedor = DB::table('compras')
            ->join('proveedors', 'compras.proveedor_id', '=', 'proveedors.id')
            ->select(
                'proveedors.nombre_proveedor',
                DB::raw('COUNT(compras.id) as cantidad_compras'),
                DB::raw('SUM(compras.total_compra) as total_gastado')
            )
            ->groupBy('proveedors.id', 'proveedors.nombre_proveedor')
            ->orderByDesc('total_gastado')
            ->get();


        // Renderizar la vista con los datos
        return Inertia::render('logistica/index', [
            'totalCategorias' => $totalCategorias,
            'categoriasActivas' => $categoriasActivas,
            'totalProveedores' => $totalProveedores,
            'totalClientes' => $totalClientes,
            'totalProductos' => $totalProductos,
            'totalUnidades' => $totalUnidades, // Total de unidades por porductos
            'inversionTotal' => $inversionTotal, // Inversión total de los productos
            'totalCuentas' => $totalCuentas,  // Cuentasa de Inversion y Ganancias
            'saldoCuentas' => $saldoCuentas,  // Saldo de las Cuentas Bancarias
            'deudaPendientes' => $deudaPendientes, // Deudas a Proveedores
            'deudaPendietesSaldo' => $deudaPendietesSaldo,
            'montoGeneralInvertido' => $montoGeneralInvertido, // Toda la plata limpia del negocio 💀

            // Charts
            'gastosMensuales' => $gastosMensuales,
            'productosTop' => $productosTop,
            'comprasPorProveedor' => $comprasPorProveedor,
        ]);
    }
}
