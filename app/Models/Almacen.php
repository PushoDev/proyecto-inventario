<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;

    // Especificar el nombre de la tabla
    protected $table = 'almacens';

    // Campos que pueden ser llenados mediante asignación masiva
    protected $fillable = [
        'nombre_almacen',
        'telefono_almacen',
        'correo_almacen',
        'provincia_almacen',
        'ciudad_almacen',
    ];

    // Clave primaria (por defecto es 'id', pero lo dejamos explícito)
    protected $primaryKey = 'id';
}
