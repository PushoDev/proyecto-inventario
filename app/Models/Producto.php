<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre_producto',
        'categoria_id',
        'precio_compra_producto',
        'cantidad_producto',
        'imagen_producto',
    ];

    // Accesor para obtener la URl de la imagen
    public function getImagenUrkAtribute()
    {
        return $this->imagen_producto ? asset('storage/' . $this->imagen_producto) : null;
    }
}
