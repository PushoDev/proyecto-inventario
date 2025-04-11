<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     * Listado de Proveedores
     */
    public function index()
    {
        return Inertia::render('proveedores/index', [
            'proveedores' => Proveedor::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Ruta para crear un nuevo proveedor
     */
    public function create()
    {
        return Inertia::render('proveedores/create', []);
    }

    /**
     * Store a newly created resource in storage.
     * Agregar un nuevo proveedor
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_proveedor' => ['required', 'string'],
            'telefono_proveedor' => ['required', 'string', 'unique:proveedors,telefono_proveedor'],
            'correo_proveedor' => ['nullable', 'string', 'unique:proveedors,correo_proveedor'],
            'localidad_proveedor' => ['required', 'string'],
            'notas_proveedor' => ['nullable', 'string'],
        ]);

        Proveedor::create([
            'nombre_proveedor' => $request->nombre_proveedor,
            'telefono_proveedor' => $request->telefono_proveedor,
            'correo_proveedor' => $request->correo_proveedor,
            'localidad_proveedor' => $request->localidad_proveedor,
            'notas_proveedor' => $request->notas_proveedor,
        ]);

        return redirect()->route('proveedores.create')->with('success', 'Proveedor creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Proveedor $proveedor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * Editar Proveedor
     */
    public function edit(Proveedor $proveedor)
    {
        return Inertia::render('proveedores/edit', [
            'proveedor' => $proveedor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Actualizar proveedor seleccionado
     */
    public function update(Request $request, Proveedor $proveedor)
    {
        $request->validate([
            'nombre_proveedor' => ['required', 'string'],
            'telefono_proveedor' => ['required', 'string', 'unique:proveedors,telefono_proveedor,' . $proveedor->id],
            'correo_proveedor' => ['nullable', 'string', 'unique:proveedors,correo_proveedor,' . $proveedor->id],
            'localidad_proveedor' => ['required', 'string'],
            'notas_proveedor' => ['nullable', 'string'],
        ]);

        $proveedor->update([
            'nombre_proveedor' => $request->nombre_proveedor,
            'telefono_proveedor' => $request->telefono_proveedor,
            'correo_proveedor' => $request->correo_proveedor,
            'localidad_proveedor' => $request->localidad_proveedor,
            'notas_proveedor' => $request->notas_proveedor,
        ]);

        return redirect()->route('proveedores.index')->with('success', 'Proveedor actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     * Eliminar Proveedor
     */
    public function destroy(Proveedor $proveedor)
    {
        $proveedor->delete();
        return redirect()->route('proveedores.index')->with('success', 'Proveedor eliminado exitosamente.');
    }
}
