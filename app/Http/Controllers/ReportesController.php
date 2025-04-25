<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;

class ReportesController extends Controller
{
    /**
     * Obtener todas las compras con sus detalles.
     */
    public function getCompras()
    {
        $compras = Compra::with(['almacen', 'proveedor', 'productos'])->get();

        return response()->json([
            'data' => $compras->map(function ($compra) {
                return [
                    'id' => $compra->id,
                    'fecha' => $compra->fecha_compra,
                    'almacen' => $compra->almacen->nombre_almacen,
                    'proveedor' => $compra->proveedor->nombre_proveedor,
                    'total' => $compra->total_compra,
                    'productos' => $compra->productos->map(function ($producto) {
                        return [
                            'nombre' => $producto->nombre_producto,
                            'categoria' => $producto->categoria->nombre_categoria,
                            'codigo' => $producto->codigo_producto,
                            'cantidad' => $producto->pivot->cantidad,
                            'precio' => $producto->pivot->precio,
                            'subtotal' => $producto->pivot->cantidad * $producto->pivot->precio,
                        ];
                    }),
                ];
            }),
        ]);
    }
}
