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
            'productos.*.codigo' => 'required|string|max:255|unique:productos,codigo_producto', // Código único
            'productos.*.cantidad' => 'required|integer|min:1',
            'productos.*.precio' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            // Buscar o crear almacén y proveedor
            $almacen = Almacen::firstOrCreate(['nombre_almacen' => $request->almacen]);
            $proveedor = Proveedor::firstOrCreate(['nombre_proveedor' => $request->proveedor]);

            // Crear compra
            $compra = Compra::create([
                'almacen_id' => $almacen->id,
                'proveedor_id' => $proveedor->id,
                'fecha_compra' => $request->fecha,
                'total_compra' => collect($request->productos)->sum(fn($p) => $p['cantidad'] * $p['precio']),
            ]);

            foreach ($request->productos as $item) {
                $categoria = Categoria::firstOrCreate(['nombre_categoria' => $item['categoria']]);

                // Crear un nuevo producto siempre
                $producto = Producto::create([
                    'nombre_producto' => $item['producto'],
                    'categoria_id' => $categoria->id,
                    'codigo_producto' => $item['codigo'], // Código único
                    'precio_compra_producto' => $item['precio'], // Precio de compra
                    'cantidad_producto' => $item['cantidad'], // Cantidad comprada
                ]);

                // Adjuntar a la compra
                $compra->productos()->attach($producto->id, [
                    'cantidad' => $item['cantidad'],
                    'precio' => $item['precio'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Compra registrada correctamente',
                'data' => [
                    'id' => $compra->id,
                    'almacen' => $almacen->nombre_almacen,
                    'proveedor' => $proveedor->nombre_proveedor,
                    'fecha' => $compra->fecha_compra,
                    'total' => $compra->total_compra,
                    'productos' => $request->productos,
                ],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al registrar la compra'], 500);
        }
    }
}
