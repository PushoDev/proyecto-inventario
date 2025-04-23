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
        Schema::create('compra_producto', function (Blueprint $table) {

            // Claves foráneas
            $table->unsignedBigInteger('compra_id');
            $table->unsignedBigInteger('producto_id');

            // Datos específicos de la relación
            $table->integer('cantidad')->default(0); // Cantidad del producto en la compra
            $table->decimal('precio', 8, 2)->default(0); // Precio del producto en la compra

            // Clave primaria compuesta
            $table->primary(['compra_id', 'producto_id']);

            // Relaciones de integridad referencial
            $table->foreign('compra_id')->references('id')->on('compras')->onDelete('cascade');
            $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');

            // Índices para optimizar consultas frecuentes
            $table->index(['compra_id']);
            $table->index(['producto_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compra_producto');
    }
};
