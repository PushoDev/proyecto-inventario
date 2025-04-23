<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompraProducto extends Model
{
    protected $table = 'compra_producto';

    protected $fillable = [
        'compra_id',
        'producto_id',
        'cantidad',
        'precio',
    ];

    // Relación con Compra
    public function compra()
    {
        return $this->belongsTo(Compra::class);
    }

    // Relación con Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
