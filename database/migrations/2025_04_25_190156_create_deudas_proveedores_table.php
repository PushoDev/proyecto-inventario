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
        Schema::create('deudas_proveedores', function (Blueprint $table) {
            $table->id();

            // Relación con la tabla 'proveedors'
            $table->foreignId('proveedor_id')->constrained('proveedors')->onDelete('cascade');
            // Monto de la deuda
            $table->decimal('monto_deuda', 10, 2)->default(0.00);
            // Fecha en la que se generó la deuda
            $table->date('fecha_generacion');
            // Estado de la deuda (puede ser 'pendiente', 'pagado', etc.)
            $table->enum('estado', ['pendiente', 'pagado'])->default('pendiente');
            // Notas adicionales sobre la deuda
            $table->text('notas')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deudas_proveedores');
    }
};
