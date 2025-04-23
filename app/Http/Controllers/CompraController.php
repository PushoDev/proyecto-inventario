<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use App\Models\Categoria;
use App\Models\Compra;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'almacen' => 'required|string|max:255',
            'proveedor' => 'required|string|max:255',
            'fecha' => 'required|date',
            'productos' => 'required|array',
            'productos.*.producto' => 'required|string|max:255',
            'productos.*.categoria' => 'required|string|max:255',
            'productos.*.codigo' => 'required|string|max:255',
            'productos.*.cantidad' => 'required|integer|min:1',
            'productos.*.precio' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Iniciar una transacción para asegurar la integridad de los datos
            DB::beginTransaction();

            // Buscar o crear el almacén y el proveedor
            $almacen = Almacen::firstOrCreate(['nombre_almacen' => $request->almacen]);
            $proveedor = Proveedor::firstOrCreate(['nombre_proveedor' => $request->proveedor]);

            // Crear la compra
            $compra = Compra::create([
                'almacen_id' => $almacen->id,
                'proveedor_id' => $proveedor->id,
                'fecha_compra' => $request->fecha,
                'total_compra' => collect($request->productos)->sum(function ($producto) {
                    return $producto['cantidad'] * $producto['precio'];
                }),
            ]);

            // Asociar productos con la compra
            foreach ($request->productos as $item) {
                $categoria = Categoria::firstOrCreate(['nombre_categoria' => $item['categoria']]);
                $producto = Producto::firstOrCreate(
                    ['codigo_producto' => $item['codigo']],
                    [
                        'nombre_producto' => $item['producto'],
                        'categoria_id' => $categoria->id,
                        'precio_compra_producto' => $item['precio'],
                        'cantidad_producto' => $item['cantidad'],
                    ]
                );

                // Adjuntar el producto a la compra con cantidad y precio
                $compra->productos()->attach($producto->id, [
                    'cantidad' => $item['cantidad'],
                    'precio' => $item['precio'],
                ]);
            }

            // Confirmar la transacción
            DB::commit();

            // Respuesta exitosa
            return response()->json([
                'message' => 'Compra registrada correctamente',
                'data' => [
                    'id' => $compra->id, // ID de la compra
                    'almacen' => $almacen->nombre_almacen,
                    'proveedor' => $proveedor->nombre_proveedor,
                    'fecha' => $compra->fecha_compra,
                    'total' => $compra->total_compra,
                    'productos' => $request->productos,
                ],
            ], 201);
        } catch (\Exception $e) {
            // Revertir la transacción en caso de error
            DB::rollBack();

            // Devolver un mensaje de error
            return response()->json(['error' => 'Error al registrar la compra: ' . $e->getMessage()], 500);
        }
    }
}
