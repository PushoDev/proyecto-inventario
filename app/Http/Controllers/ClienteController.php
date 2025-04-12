<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     * Listado de Clientes
     */
    public function index()
    {
        return Inertia::render("clientes/index", [
            "clientes" => Cliente::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Ruta para crear un nuevo cliente
     */
    public function create()
    {
        return Inertia::render('clientes/create', []);
    }

    /**
     * Store a newly created resource in storage.
     * Agregar un nuevo cliente
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_cliente' => ['required', 'string', 'unique:clientes,nombre_cliente'],
            'telefono_cliente' => ['required', 'string', 'unique:clientes,telefono_cliente'],
            'direccion_cliente' => ['nullable', 'string'],
            'ciudad_cliente' => ['nullable', 'string'],
        ]);

        Cliente::create([
            'nombre_cliente' => $request->nombre_cliente,
            'telefono_cliente' => $request->telefono_cliente,
            'direccion_cliente' => $request->direccion_cliente,
            'ciudad_cliente' => $request->ciudad_cliente,
        ]);

        return redirect()->route('clientes.index')->with('success', 'Cliente creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * Editar Cliente
     */
    public function edit(Cliente $cliente)
    {
        return Inertia::render('clientes/edit', [
            'cliente' => $cliente,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Actualizar cliente seleccionado
     */
    public function update(Request $request, Cliente $cliente)
    {
        $request->validate([
            'nombre_cliente' => ['required', 'string', 'unique:clientes,nombre_cliente,' . $cliente->id],
            'telefono_cliente' => ['required', 'string', 'unique:clientes,telefono_cliente,' . $cliente->id],
            'direccion_cliente' => ['nullable', 'string'],
            'ciudad_cliente' => ['nullable', 'string'],
        ]);

        $cliente->update([
            'nombre_cliente' => $request->nombre_cliente,
            'telefono_cliente' => $request->telefono_cliente,
            'direccion_cliente' => $request->direccion_cliente,
            'ciudad_cliente' => $request->ciudad_cliente,
        ]);

        return redirect()->route('clientes.index')->with('success', 'Cliente actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     * Eliminar Cliente
     */
    public function destroy(Cliente $cliente)
    {
        $cliente->delete();
        return redirect()->route('clientes.index')->with('success', 'Cliente eliminado exitosamente.');
    }
}
