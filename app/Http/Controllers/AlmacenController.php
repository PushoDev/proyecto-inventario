<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlmacenController extends Controller
{
    /**
     * Display a listing of the resource.
     * Listado de Almacenes
     */
    public function index()
    {
        return Inertia::render('almacenes/index', [
            'almacenes' => Almacen::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Ruta para crear un nuevo almacén
     */
    public function create()
    {
        return Inertia::render('almacenes/create');
    }

    /**
     * Store a newly created resource in storage.
     * Agregar un nuevo almacén
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_almacen' => ['required', 'string', 'unique:almacens,nombre_almacen'],
            'telefono_almacen' => ['required', 'string', 'unique:almacens,telefono_almacen'],
            'correo_almacen' => ['nullable', 'string', 'unique:almacens,correo_almacen'],
            'provincia_almacen' => ['nullable', 'string'],
            'ciudad_almacen' => ['nullable', 'string'],
            'notas_almacen' => ['nullable', 'string'],
        ]);

        Almacen::create($validated);

        return redirect()->route('almacenes.index')->with('success', 'Almacén creado exitosamente.');
    }

    /**
     * Display the specified resource.
     * Ruta para mostrar detalles del almacén
     */
    public function show($id)
    {
        $almacen = Almacen::findOrFail($id);

        return Inertia::render('almacenes/show', compact('almacen'));
    }

    /**
     * Show the form for editing the specified resource.
     * Editar Almacén
     */
    public function edit($id)
    {
        $almacen = Almacen::findOrFail($id);

        return Inertia::render('almacenes/edit', compact('almacen'));
    }

    /**
     * Update the specified resource in storage.
     * Actualizar almacén seleccionado
     */
    public function update(Request $request, Almacen $almacen)
    {
        $validated = $request->validate([
            'nombre_almacen' => [
                'required',
                'string',
                'unique:almacens,nombre_almacen,' . $almacen->id
            ],
            'telefono_almacen' => [
                'required',
                'string',
                'unique:almacens,telefono_almacen,' . $almacen->id
            ],
            'correo_almacen' => [
                'nullable',
                'string',
                'unique:almacens,correo_almacen,' . $almacen->id
            ],
            'provincia_almacen' => ['nullable', 'string'],
            'ciudad_almacen' => ['nullable', 'string'],
            'notas_almacen' => ['nullable', 'string'],
        ]);

        $almacen->update($validated);

        return redirect()->route('almacenes.index')->with('success', 'Almacén actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     * Eliminar Almacén
     */
    public function destroy(Almacen $almacen)
    {
        $almacen->delete();

        return redirect()->route('almacenes.index')->with('success', 'Almacén eliminado exitosamente.');
    }
}
