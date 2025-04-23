<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;

    protected $table = 'almacens';

    protected $fillable = [
        'nombre_almacen',
        'telefono_almacen',
        'correo_almacen',
        'provincia_almacen',
        'ciudad_almacen',
        'notas_almacen'
    ];

    protected $primaryKey = 'id';

    // Relación: Un almacén puede tener muchas compras
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
