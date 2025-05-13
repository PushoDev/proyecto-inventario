<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::with('categoria')->get();

        return Inertia::render('productos/index', [
            'productos' => $productos->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre_producto' => $producto->nombre_producto,
                    'marca_producto' => $producto->marca_producto,
                    'codigo_producto' => $producto->codigo_producto,
                    'categoria' => $producto->categoria ? $producto->categoria->nombre_categoria : null,
                    'precio_compra_producto' => $producto->precio_compra_producto,
                    'cantidad_producto' => $producto->cantidad_producto,
                    'imagen_url' => $producto->imagen_url,
                ];
            }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        $categorias = Categoria::all();

        return Inertia::render('productos/edit', [
            'producto' => [
                'id' => $producto->id,
                'nombre_producto' => $producto->nombre_producto,
                'marca_producto' => $producto->marca_producto,
                'codigo_producto' => $producto->codigo_producto,
                'categoria_id' => $producto->categoria_id,
                'precio_compra_producto' => $producto->precio_compra_producto,
                'cantidad_producto' => $producto->cantidad_producto,
                'imagen_producto' => $producto->imagen_producto,
                'imagen_url' => $producto->imagen_url,
            ],
            'categorias' => $categorias->map(fn($cat) => [
                'id' => $cat->id,
                'nombre_categoria' => $cat->nombre_categoria,
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        // Validación correcta
        $validated = $request->validate([
            'nombre_producto' => ['required', 'string', 'max:255'],
            'marca_producto' => ['nullable', 'string', 'max:255'],
            'codigo_producto' => ['nullable', 'string', 'max:255', 'unique:productos,codigo_producto,' . $producto->id],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'precio_compra_producto' => ['required', 'numeric', 'min:0'],
            'cantidad_producto' => ['required', 'integer', 'min:0'],
            'imagen_producto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Máximo 2MB
        ]);

        // Convertir categoria_id a entero
        $validated['categoria_id'] = (int)$request->categoria_id;

        // Manejar imagen si se proporciona
        if ($request->hasFile('imagen_producto')) {
            // Eliminar la imagen anterior si existe
            if ($producto->imagen_producto && Storage::disk('public')->exists($producto->imagen_producto)) {
                Storage::disk('public')->delete($producto->imagen_producto);
            }

            // Guardar nueva imagen
            $path = $request->file('imagen_producto')->store('productos', 'public');
            $validated['imagen_producto'] = $path;
        }

        // Actualizar el producto
        $producto->update($validated);

        // Redirigir con mensaje de éxito
        return redirect()->route('productos.index')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        if ($producto->imagen_producto && Storage::disk('public')->exists($producto->imagen_producto)) {
            Storage::disk('public')->delete($producto->imagen_producto);
        }

        $producto->delete();

        return redirect()->route('productos.index')->with('success', 'Producto eliminado exitosamente.');
    }
}
