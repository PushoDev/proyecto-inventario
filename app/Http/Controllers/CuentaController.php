<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Models\DeudasProveedores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cuentas = Cuenta::all();
        // Obtener todas las deudas de los proveedores con sus relaciones
        $deudasProveedores = DeudasProveedores::with('proveedor')->get();

        return Inertia::render('cuentas/index', [
            'cuentas' => $cuentas,
            'deudasProveedores' => $deudasProveedores,
        ]);
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
        // Validar los datos recibidos del formulario
        $validated = $request->validate([
            'nombre_cuenta' => 'required|string|max:255|unique:cuentas',
            'saldo_cuenta' => 'nullable|numeric',
            'tipo_cuenta' => 'required|in:permanentes,temporales',
            'notas_cuenta' => 'nullable|string',
        ]);

        // Crear una nueva cuenta en la base de datos
        Cuenta::create($validated);

        // Redireccionar al índice con un mensaje de éxito
        return redirect()->route('cuentas.index')->with('success', 'Cuenta creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cuenta $cuenta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cuenta $cuenta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cuenta $cuenta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cuenta $cuenta)
    {
        //
    }
}
