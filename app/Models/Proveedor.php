<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_proveedor',
        'telefono_proveedor',
        'correo_proveedor',
        'localidad_proveedor',
        'notas_proveedor',
    ];

    protected $primaryKey = 'id';

    // Relación: Un proveedor puede tener muchas compras
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
