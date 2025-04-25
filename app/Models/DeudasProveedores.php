<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeudasProveedores extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    /**
     * Nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'deudas_proveedores';

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array
     */
    protected $fillable = [
        'proveedor_id',
        'monto_deuda',
        'fecha_generacion',
        'estado',
        'notas',
    ];

    /**
     * Relación con el modelo Proveedor.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    /**
     * Accesor para formatear el monto de la deuda como moneda.
     *
     * @return string
     */
    public function getMontoDeudaFormattedAttribute()
    {
        return '$' . number_format($this->monto_deuda, 2);
    }
}
