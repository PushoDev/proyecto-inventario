<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('almacen_id');
            $table->unsignedBigInteger('proveedor_id');
            $table->unsignedBigInteger('cuenta_id'); // NUEVO: Relación con cuentas
            $table->date('fecha_compra');
            $table->decimal('total_compra', 10, 2)->default(0);
            $table->string('tipo_compra'); // NUEVO: 'deuda_proveedor' o 'pago_cash'
            $table->timestamps();

            $table->foreign('almacen_id')->references('id')->on('almacens')->onDelete('cascade');
            $table->foreign('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onDelete('cascade'); // NUEVA FK

            // Índices para optimizar consultas frecuentes
            $table->index(['fecha_compra']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compras');
    }
};
