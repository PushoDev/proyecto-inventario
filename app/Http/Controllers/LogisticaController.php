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
        // Llamar y Contar valores
        $totalCategorias = DB::table('categorias')->count();
        $categoriasActivas = DB::table('categorias')->select('activar_categoria')->value('');
        $totalProveedores = DB::table('proveedors')->count();
        $totalClientes = DB::table('clientes')->count();
        return Inertia::render('logistica/index', [
            'totalCategorias' => $totalCategorias,
            'categoriasActivas' => $categoriasActivas,
            'totalProveedores' => $totalProveedores,
            'totalClientes' => $totalClientes,

        ]);
    }
}
