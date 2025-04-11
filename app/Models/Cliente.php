<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_cliente',
        'telefono_cliente',
        'direccion_cliente',
        'ciudad_cliente',
    ];

    protected $primaryKey = 'id';
}
