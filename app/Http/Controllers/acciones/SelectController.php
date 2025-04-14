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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
