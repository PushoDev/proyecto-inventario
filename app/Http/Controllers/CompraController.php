<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use App\Models\Categoria;
use App\Models\Compra;
use App\Models\Cuenta;
use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompraController extends Controller
{
    public function index()
    {
        $cuentas = Cuenta::all();
        $almacenes = Almacen::all();
        $proveedores = Proveedor::all();
        $categorias = Categoria::all();

        return Inertia::render('comprar/index', compact('cuentas', 'almacenes', 'proveedores', 'categorias'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'compra' => 'required|in:deuda_proveedor,pago_cash',
            'cuenta_id' => 'required|exists:cuentas,id',
            'almacen' => 'required|string|max:255',
            'proveedor' => 'required|string|max:255',
            'fecha' => 'required|date',
            'productos' => 'required|array|min:1',
            'productos.*.producto' => 'required|string|max:255',
            'productos.*.categoria' => 'required|string|max:255',
            'productos.*.codigo' => 'required|string|max:255|unique:productos,codigo_producto',
            'productos.*.cantidad' => 'required|integer|min:1',
            'productos.*.precio' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            // Crear/obtener almacén y proveedor
            $almacen = Almacen::firstOrCreate(['nombre_almacen' => $validated['almacen']]);
            $proveedor = Proveedor::firstOrCreate(['nombre_proveedor' => $validated['proveedor']]);

            // Calcular total y crear compra
            $total = collect($validated['productos'])->sum(fn($p) => $p['cantidad'] * $p['precio']);
            $compra = Compra::create([
                'almacen_id' => $almacen->id,
                'proveedor_id' => $proveedor->id,
                'cuenta_id' => $validated['cuenta_id'],
                'fecha_compra' => $validated['fecha'],
                'total_compra' => $total,
                'tipo_compra' => $validated['compra'],
            ]);

            // Procesar productos
            foreach ($validated['productos'] as $item) {
                $categoria = Categoria::firstOrCreate(['nombre_categoria' => $item['categoria']]);

                $producto = Producto::create([
                    'nombre_producto' => $item['producto'],
                    'categoria_id' => $categoria->id,
                    'codigo_producto' => $item['codigo'],
                    'precio_compra_producto' => $item['precio'],
                    'cantidad_producto' => $item['cantidad'],
                ]);

                $compra->productos()->attach($producto->id, [
                    'cantidad' => $item['cantidad'],
                    'precio' => $item['precio'],
                ]);
            }

            // Actualizar cuenta según tipo de compra
            $cuenta = Cuenta::findOrFail($validated['cuenta_id']);
            if ($validated['compra'] === 'deuda_proveedor') {
                $cuenta->deuda += $total;
            } else {
                $cuenta->saldo_cuenta -= $total;
            }
            $cuenta->save();

            DB::commit();

            // Redirigir con mensaje de éxito
            return Inertia::location(route('dashboard'));
        } catch (\Exception $e) {
            DB::rollBack();
            return Inertia::render('comprar/index', [
                'errors' => ['_error' => 'Error al procesar la compra: ' . $e->getMessage()]
            ])->withStatusCode(500);
        }
    }
}
