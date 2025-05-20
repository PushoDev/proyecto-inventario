<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $table = 'almacens';

    protected $fillable = [
        'nombre_almacen',
        'telefono_almacen',
        'correo_almacen',
        'provincia_almacen',
        'ciudad_almacen',
        'notas_almacen'
    ];




    // Relacion: Tabla de los productos
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    // Relación: Un almacén puede tener muchas compras
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
