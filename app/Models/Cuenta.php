<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre_cuenta',
        'saldo_cuenta',
        'deuda',
        'tipo_cuenta',
        'notas_cuenta',
    ];

    protected $casts = [
        'saldo_cuenta' => 'float',
        'deuda' => 'float',
    ];

    // Relación con compras (opcional)
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
