<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre_categoria',
        'descripcion_categoria',
        'activar_categoria',
    ];

    protected $casts = [
        'activar_categoria' => 'boolean',
    ];

    // Relación: Una categoría puede tener muchos productos
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
