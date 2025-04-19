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
        // Obtener todos los productos con sus categorías relacionadas
        $productos = Producto::with('categoria')->get();

        return Inertia::render('productos/index', [
            'productos' => $productos->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre_producto' => $producto->nombre_producto,
                    'marca_producto' => $producto->marca_producto,
                    'codigo_producto' => $producto->codigo_producto,
                    'categoria' => $producto->categoria ? $producto->categoria->nombre_categoria : null, // Solo el nombre de la categoría
                    'precio_compra_producto' => $producto->precio_compra_producto,
                    'cantidad_producto' => $producto->cantidad_producto,
                    'imagen_url' => $producto->imagen_url, // Accesor definido en el modelo
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'nombre_producto' => ['required', 'string', 'max:255'],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'precio_compra_producto' => ['required', 'numeric', 'min:0'],
            'cantidad_producto' => ['required', 'integer', 'min:0'],
            'imagen_producto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Máximo 2MB
        ]);

        // Manejar la carga de la imagen si se proporciona
        if ($request->hasFile('imagen_producto')) {
            $imagenPath = $request->file('imagen_producto')->store('productos', 'public');
            $validated['imagen_producto'] = $imagenPath;
        }

        // Crear el producto
        Producto::create($validated);

        // Redirigir al índice con un mensaje de éxito
        return redirect()->route('productos.index')->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        // Obtener todas las categorías disponibles
        $categorias = Categoria::all();

        // Renderizar la vista para editar el producto
        return Inertia::render('productos/edit', [
            'producto' => [
                'id' => $producto->id,
                'nombre_producto' => $producto->nombre_producto,
                'marca_producto' => $producto->marca_producto,
                'codigo_producto' => $producto->codigo_producto,
                'categoria_id' => $producto->categoria_id, // ID de la categoría actual del producto
                'precio_compra_producto' => $producto->precio_compra_producto,
                'cantidad_producto' => $producto->cantidad_producto,
                'imagen_producto' => $producto->imagen_producto,
                'imagen_url' => $producto->imagen_url, // URL completa de la imagen (accesor definido en el modelo)
            ],
            'categorias' => $categorias->map(function ($categoria) {
                return [
                    'id' => $categoria->id,
                    'nombre_categoria' => $categoria->nombre_categoria,
                ];
            }),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'nombre_producto' => ['required', 'string', 'max:255'],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'precio_compra_producto' => ['required', 'numeric', 'min:0'],
            'cantidad_producto' => ['required', 'integer', 'min:0'],
            'imagen_producto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Máximo 2MB
        ]);

        // Manejar la carga de la imagen si se proporciona
        if ($request->hasFile('imagen_producto')) {
            // Eliminar la imagen anterior si existe
            if ($producto->imagen_producto) {
                Storage::disk('public')->delete($producto->imagen_producto);
            }

            // Guardar la nueva imagen
            $imagenPath = $request->file('imagen_producto')->store('productos', 'public');
            $validated['imagen_producto'] = $imagenPath;
        }

        // Actualizar el producto
        $producto->update($validated);

        // Redirigir al índice con un mensaje de éxito
        return redirect()->route('productos.index')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        // Eliminar la imagen asociada si existe
        if ($producto->imagen_producto) {
            Storage::disk('public')->delete($producto->imagen_producto);
        }

        // Eliminar el producto
        $producto->delete();

        // Redirigir al índice con un mensaje de éxito
        return redirect()->route('productos.index')->with('success', 'Producto eliminado exitosamente.');
    }
}
