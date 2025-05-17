<?php

namespace App\Http\Controllers\acciones;

use App\Http\Controllers\Controller;
use App\Models\Almacen;
use App\Models\Categoria;
use App\Models\Cuenta;
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

    // Obtener cuentas monetarias
    public function getCuentas()
    {
        return response()->json(Cuenta::select('id', 'nombre_cuenta', 'saldo_cuenta')->get());
    }


    /**
     * Mostrar los productos de un almacén.
     */
    public function getProductos($id)
    {
        // Cargar el almacén con sus compras y los productos asociados
        $almacen = Almacen::with('compras.productos')->find($id);

        if (!$almacen) {
            return response()->json([
                'message' => 'Almacén no encontrado'
            ], 404);
        }

        // Coleccionar todos los productos con su cantidad y precio por compra
        $productos = [];

        foreach ($almacen->compras as $compra) {
            foreach ($compra->productos as $producto) {
                $productos[] = [
                    'compra_id' => $compra->id,
                    'producto_id' => $producto->id,
                    'nombre_producto' => $producto->nombre_producto,
                    'marca_producto' => $producto->marca_producto,
                    'cantidad' => $producto->pivot->cantidad,
                    'precio' => $producto->pivot->precio,
                    'fecha_compra' => $compra->fecha_compra
                ];
            }
        }

        return response()->json([
            'almacen' => $almacen,
            'productos' => $productos
        ]);
    }
}
