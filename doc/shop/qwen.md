Entendido. Vamos a generar **todo el backend necesario** para que funcione la compra, incluyendo las tablas, modelos, controladores, migraciones y rutas. Esto incluye también la tabla de productos, ya que aún no la tienes creada.

---

### **1. Migraciones**

#### a) Tabla `productos`

Esta tabla almacenará los productos que se compran y su stock.

```php
Schema::create('productos', function (Blueprint $table) {
    $table->id();
    $table->string('nombre_producto');
    $table->unsignedBigInteger('categoria_id');
    $table->string('codigo_producto')->unique();
    $table->integer('cantidad_producto')->default(0);
    $table->decimal('precio_compra', 8, 2)->nullable();
    $table->timestamps();

    $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');

    // Índice para optimizar consultas frecuentes
    $table->index(['codigo_producto']);
});
```

#### b) Tabla `compras`

Almacena la información general de cada compra.

```php
Schema::create('compras', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('almacen_id');
    $table->unsignedBigInteger('proveedor_id');
    $table->date('fecha_compra');
    $table->decimal('total_compra', 10, 2)->default(0);
    $table->timestamps();

    $table->foreign('almacen_id')->references('id')->on('almacens')->onDelete('cascade');
    $table->foreign('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');

    // Índices para optimizar consultas frecuentes
    $table->index(['fecha_compra']);
});
```

#### c) Tabla `compra_detalles`

Almacena los detalles de los productos comprados.

```php
Schema::create('compra_detalles', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('compra_id');
    $table->unsignedBigInteger('producto_id');
    $table->integer('cantidad')->unsigned();
    $table->decimal('precio_unitario', 8, 2);
    $table->decimal('subtotal', 10, 2)->default(0);
    $table->timestamps();

    $table->foreign('compra_id')->references('id')->on('compras')->onDelete('cascade');
    $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');

    // Índices para optimizar consultas frecuentes
    $table->index(['compra_id', 'producto_id']);
});
```

---

### **2. Modelos**

#### a) Modelo `Producto`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_producto',
        'categoria_id',
        'codigo_producto',
        'cantidad_producto',
        'precio_compra',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function detallesCompra()
    {
        return $this->hasMany(CompraDetalle::class);
    }
}
```

#### b) Modelo `Compra`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'almacen_id',
        'proveedor_id',
        'fecha_compra',
        'total_compra',
    ];

    public function almacen()
    {
        return $this->belongsTo(Almacen::class);
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function detalles()
    {
        return $this->hasMany(CompraDetalle::class);
    }
}
```

#### c) Modelo `CompraDetalle`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompraDetalle extends Model
{
    use HasFactory;

    protected $fillable = [
        'compra_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
        'subtotal',
    ];

    public function compra()
    {
        return $this->belongsTo(Compra::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
```

---

### **3. Controlador**

#### `CompraController`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\CompraDetalle;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompraController extends Controller
{
    // Cargar datos iniciales
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
```

---

### **4. Rutas**

En `routes/api.php`:

```php
use App\Http\Controllers\CompraController;

Route::middleware(['auth:sanctum'])->group(function () {
    // Rutas para cargar datos iniciales
    Route::get('/compras/datos', [CompraController::class, 'cargarDatos'])->name('compras.datos');
    Route::post('/compras/registrar', [CompraController::class, 'registrarCompra'])->name('compras.registrar');
});
```

---

### **5. Resumen del Funcionamiento**

1. **Migraciones**:

   - Las tablas `productos`, `compras` y `compra_detalles` están creadas y relacionadas correctamente.
   - La tabla `productos` almacena los productos y su stock.
2. **Modelos**:

   - Los modelos `Producto`, `Compra` y `CompraDetalle` manejan las relaciones entre las tablas.
3. **Controlador**:

   - El método `cargarDatos` carga los datos iniciales (almacenes, proveedores, categorías).
   - El método `registrarCompra` maneja la lógica para registrar la compra, crear los detalles y actualizar el stock.
4. **Rutas**:

   - Las rutas permiten cargar datos iniciales y registrar compras.

---

Con esto, el backend está listo para funcionar con tu vista React. Si necesitas más ajustes o tienes dudas, ¡no dudes en preguntar! 😊
