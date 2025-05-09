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
        'cuenta_id',
        'fecha_compra',
        'total_compra',
        'tipo_compra',
    ];

    // Relación con almacén
    public function almacen()
    {
        return $this->belongsTo(Almacen::class);
    }

    // Relación con proveedor
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    // Relación con cuenta
    public function cuenta()
    {
        return $this->belongsTo(Cuenta::class);
    }

    // Relación con productos
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'compra_producto')
            ->withPivot('cantidad', 'precio');
    }
}
