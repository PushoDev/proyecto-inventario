<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Producto extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre_producto',
        'marca_producto',
        'codigo_producto',
        'categoria_id',
        'precio_compra_producto',
        'cantidad_producto',
        'imagen_producto',
    ];

    // Casts para asegurar tipos de datos
    protected $casts = [
        'precio_compra_producto' => 'float',
        'cantidad_producto' => 'integer',
    ];

    // Relación con la tabla categorías
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    // Accesor para obtener la URL completa de la imagen
    public function getImagenUrlAttribute(): ?string
    {
        if ($this->imagen_producto) {
            return asset('storage/' . $this->imagen_producto);
        }
        // Retorna null si no hay imagen
        return null;
    }
}
