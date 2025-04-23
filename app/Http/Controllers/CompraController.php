<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;
use App\Models\CompraDetalle;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('comprar/index');
    }

    // Cargar datos iniciales como ApiRest
    public function cargarDatos(Request $request)
    {
        $tipo = $request->input('tipo');

        if ($tipo === 'almacenes') {
            return response()->json(\App\Models\Almacen::all(['id', 'nombre_almacen']));
        } elseif ($tipo === 'proveedores') {
            return response()->json(\App\Models\Proveedor::all(['id', 'nombre_proveedor']));
        } elseif ($tipo === 'categorias') {
            return response()->json(\App\Models\Categoria::all(['id', 'nombre_categoria']));
        }
    }

    // Registrar compra
    public function registrarCompra(Request $request)
    {
        $request->validate([
            'almacen_id' => 'required|exists:almacens,id',
            'proveedor_id' => 'required|exists:proveedors,id',
            'fecha_compra' => 'required|date',
            'productos' => 'required|array',
            'productos.*.producto_id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
            'productos.*.precio_unitario' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            // Crear la compra
            $compra = Compra::create([
                'almacen_id' => $request->almacen_id,
                'proveedor_id' => $request->proveedor_id,
                'fecha_compra' => $request->fecha_compra,
                'total_compra' => 0,
            ]);

            $totalCompra = 0;

            foreach ($request->productos as $item) {
                $subtotal = $item['cantidad'] * $item['precio_unitario'];

                // Crear el detalle de la compra
                CompraDetalle::create([
                    'compra_id' => $compra->id,
                    'producto_id' => $item['producto_id'],
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $item['precio_unitario'],
                    'subtotal' => $subtotal,
                ]);

                // Actualizar el stock del producto
                $producto = Producto::find($item['producto_id']);
                $producto->cantidad_producto += $item['cantidad'];
                $producto->save();

                $totalCompra += $subtotal;
            }

            // Actualizar el total de la compra
            $compra->update(['total_compra' => $totalCompra]);

            DB::commit();
            return response()->json(['message' => 'Compra registrada exitosamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al registrar la compra'], 500);
        }
    }
}
