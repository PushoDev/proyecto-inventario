¡Claro! A continuación, te proporcionaré un ejemplo completo y funcional de un CRUD para productos con imágenes en **Laravel**, utilizando **Inertia.js** como puente entre el backend y el frontend, y **React TypeScript** para construir la interfaz. Este ejemplo incluye:

1. **Backend (Laravel)**:

   - Migraciones.
   - Modelo.
   - Controlador.
   - Rutas.
2. **Frontend (React TypeScript)**:

   - Componentes para listar, crear, editar y eliminar productos.
   - Manejo de imágenes con el sistema de almacenamiento de Laravel.

---

## **Backend (Laravel)**

### 1. **Migración**

Crea una migración para la tabla `productos` que incluya un campo para la imagen.

```bash
php artisan make:migration create_productos_table
```

**Contenido de la migración:**

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_producto')->unique();
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 8, 2);
            $table->string('imagen')->nullable(); // Campo para la imagen
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
```

Ejecuta la migración:

```bash
php artisan migrate
```

---

### 2. **Modelo**

Crea un modelo `Producto`.

```bash
php artisan make:model Producto
```

**Contenido del modelo (`app/Models/Producto.php`):**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_producto',
        'descripcion',
        'precio',
        'imagen',
    ];

    // Accesor para obtener la URL completa de la imagen
    public function getImagenUrlAttribute()
    {
        return $this->imagen ? asset('storage/' . $this->imagen) : null;
    }
}
```

---

### 3. **Controlador**

Crea un controlador `ProductoController`.

```bash
php artisan make:controller ProductoController --resource
```

**Contenido del controlador (`app/Http/Controllers/ProductoController.php`):**

```php
namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // Mostrar lista de productos
    public function index()
    {
        $productos = Producto::all();
        return Inertia::render('Productos/Index', ['productos' => $productos]);
    }

    // Mostrar formulario para crear un producto
    public function create()
    {
        return Inertia::render('Productos/Create');
    }

    // Guardar un nuevo producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre_producto' => 'required|unique:productos',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Máximo 2MB
        ]);

        // Subir imagen si existe
        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('productos', 'public');
        }

        // Crear el producto
        Producto::create([
            'nombre_producto' => $request->nombre_producto,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'imagen' => $imagenPath,
        ]);

        return redirect()->route('productos.index')->with('success', 'Producto creado exitosamente.');
    }

    // Mostrar formulario para editar un producto
    public function edit(Producto $producto)
    {
        return Inertia::render('Productos/Edit', ['producto' => $producto]);
    }

    // Actualizar un producto existente
    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre_producto' => 'required|unique:productos,nombre_producto,' . $producto->id,
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Actualizar imagen si se sube una nueva
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }
            $imagenPath = $request->file('imagen')->store('productos', 'public');
            $producto->imagen = $imagenPath;
        }

        // Actualizar otros campos
        $producto->update([
            'nombre_producto' => $request->nombre_producto,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
        ]);

        return redirect()->route('productos.index')->with('success', 'Producto actualizado exitosamente.');
    }

    // Eliminar un producto
    public function destroy(Producto $producto)
    {
        // Eliminar imagen si existe
        if ($producto->imagen) {
            Storage::disk('public')->delete($producto->imagen);
        }

        $producto->delete();

        return redirect()->route('productos.index')->with('success', 'Producto eliminado exitosamente.');
    }
}
```

---

### 4. **Rutas**

Agrega las rutas en `routes/web.php`:

```php
use App\Http\Controllers\ProductoController;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('/productos/create', [ProductoController::class, 'create'])->name('productos.create');
    Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
    Route::get('/productos/{producto}/edit', [ProductoController::class, 'edit'])->name('productos.edit');
    Route::put('/productos/{producto}', [ProductoController::class, 'update'])->name('productos.update');
    Route::delete('/productos/{producto}', [ProductoController::class, 'destroy'])->name('productos.destroy');
});
```

---

## **Frontend (React TypeScript)**

### 1. **Componente para Listar Productos**

Crea un archivo `resources/js/Pages/Productos/Index.tsx`:

```tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProductoProps {
    id: number;
    nombre_producto: string;
    descripcion: string;
    precio: number;
    imagen_url: string | null;
}

interface Props {
    productos: ProductoProps[];
}

export default function ProductosIndex({ productos }: Props) {
    return (
        <div>
            <Head title="Productos" />
            <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
            <Link href="/productos/create">
                <Button className="mb-4">Crear Producto</Button>
            </Link>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.id}>
                            <TableCell>{producto.nombre_producto}</TableCell>
                            <TableCell>{producto.descripcion}</TableCell>
                            <TableCell>${producto.precio.toFixed(2)}</TableCell>
                            <TableCell>
                                {producto.imagen_url ? (
                                    <img src={producto.imagen_url} alt={producto.nombre_producto} className="w-16 h-16 object-cover" />
                                ) : (
                                    'Sin imagen'
                                )}
                            </TableCell>
                            <TableCell>
                                <Link href={`/productos/${producto.id}/edit`}>
                                    <Button variant="secondary">Editar</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
```

---

### 2. **Componente para Crear Productos**

Crea un archivo `resources/js/Pages/Productos/Create.tsx`:

```tsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductosCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nombre_producto: '',
        descripcion: '',
        precio: 0,
        imagen: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/productos');
    };

    return (
        <div>
            <Head title="Crear Producto" />
            <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Nombre del Producto</Label>
                    <Input
                        type="text"
                        value={data.nombre_producto}
                        onChange={(e) => setData('nombre_producto', e.target.value)}
                    />
                    {errors.nombre_producto && <p className="text-red-500">{errors.nombre_producto}</p>}
                </div>
                <div>
                    <Label>Descripción</Label>
                    <Input
                        type="text"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                    />
                    {errors.descripcion && <p className="text-red-500">{errors.descripcion}</p>}
                </div>
                <div>
                    <Label>Precio</Label>
                    <Input
                        type="number"
                        value={data.precio}
                        onChange={(e) => setData('precio', parseFloat(e.target.value))}
                    />
                    {errors.precio && <p className="text-red-500">{errors.precio}</p>}
                </div>
                <div>
                    <Label>Imagen</Label>
                    <Input
                        type="file"
                        onChange={(e) => setData('imagen', e.target.files?.[0] || null)}
                    />
                    {errors.imagen && <p className="text-red-500">{errors.imagen}</p>}
                </div>
                <Button type="submit" disabled={processing}>Guardar</Button>
            </form>
        </div>
    );
}
```

---

### 3. **Componente para Editar Productos**

Crea un archivo `resources/js/Pages/Productos/Edit.tsx`:

```tsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductoProps {
    id: number;
    nombre_producto: string;
    descripcion: string;
    precio: number;
    imagen_url: string | null;
}

export default function ProductosEdit({ producto }: { producto: ProductoProps }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre_producto: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/productos/${producto.id}`);
    };

    return (
        <div>
            <Head title="Editar Producto" />
            <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Nombre del Producto</Label>
                    <Input
                        type="text"
                        value={data.nombre_producto}
                        onChange={(e) => setData('nombre_producto', e.target.value)}
                    />
                    {errors.nombre_producto && <p className="text-red-500">{errors.nombre_producto}</p>}
                </div>
                <div>
                    <Label>Descripción</Label>
                    <Input
                        type="text"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                    />
                    {errors.descripcion && <p className="text-red-500">{errors.descripcion}</p>}
                </div>
                <div>
                    <Label>Precio</Label>
                    <Input
                        type="number"
                        value={data.precio}
                        onChange={(e) => setData('precio', parseFloat(e.target.value))}
                    />
                    {errors.precio && <p className="text-red-500">{errors.precio}</p>}
                </div>
                <div>
                    <Label>Imagen</Label>
                    <Input
                        type="file"
                        onChange={(e) => setData('imagen', e.target.files?.[0] || null)}
                    />
                    {errors.imagen && <p className="text-red-500">{errors.imagen}</p>}
                </div>
                <Button type="submit" disabled={processing}>Actualizar</Button>
            </form>
        </div>
    );
}
```

---

Con estos pasos, tendrás un CRUD funcional para productos con imágenes en **Laravel + Inertia.js + React TypeScript**. ¡Espero que esto te sea útil! 😊
