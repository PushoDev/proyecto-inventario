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

    // Relación: Una compra pertenece a un almacén
    public function almacen()
    {
        return $this->belongsTo(Almacen::class);
    }

    // Relación: Una compra pertenece a un proveedor
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    // Relación: Una compra puede tener muchos productos
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'compra_producto')
            ->withPivot('cantidad', 'precio');
    }
}
