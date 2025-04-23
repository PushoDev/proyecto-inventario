<?php

namespace App\Http\Controllers\acciones;

use App\Http\Controllers\Controller;
use App\Models\Almacen;
use App\Models\Categoria;
use App\Models\Proveedor;
use Illuminate\Http\Request;

class SelectController extends Controller
{
    /**
     * Opciones para Cargar los select
     * Almacenes, Proveedores, Categorias
     */
    // Alamcenes
    public function getAlmacen()
    {
        return response()->json(Almacen::select('id', 'nombre_almacen')->get());
    }
    // Proveedores
    public function getProveedor()
    {
        return response()->json(Proveedor::select('id', 'nombre_proveedor')->get());
    }
    // Categorias
    public function getCategorias()
    {
        return response()->json(Categoria::select('id', 'nombre_categoria')->get());
    }
}
