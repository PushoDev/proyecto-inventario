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
            'montoGeneralInvertido' => $montoGeneralInvertido, // Toda la plata limpia del negocio 💀
        ]);
    }
}
