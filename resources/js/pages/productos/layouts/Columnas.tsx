// Columnas de los Productos

'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export type ProductoColumn = {
    id: number;
    nombre_producto: string;
    marca_producto: string | null;
    codigo_producto: string | null;
    categoria: string | null;
    precio_compra_producto: number;
    cantidad_producto: number;
    imagen_url: string | null;
};

export const columns: ColumnDef<ProductoColumn>[] = [
    {
        accessorKey: 'nombre_producto',
        header: 'Producto',
    },
    {
        accessorKey: 'categoria',
        header: 'Categoría',
    },
    {
        accessorKey: 'marca_producto',
        header: 'Marca',
    },
    {
        accessorKey: 'codigo_producto',
        header: 'Código',
    },
    {
        accessorKey: 'cantidad_producto',
        header: 'Unidades',
    },
    {
        accessorKey: 'precio_compra_producto',
        header: 'Precio',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('precio_compra_producto'));
            return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const producto = row.original;

            const handleDelete = () => {
                if (!confirm('¿Estás seguro de eliminar este producto?')) return;

                router.delete(route('productos.destroy', { producto: producto.id }), {
                    onSuccess: () => {
                        toast.success('Producto eliminado correctamente');
                    },
                    onError: () => {
                        toast.error('Error al eliminar el producto');
                    },
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={route('productos.edit', { producto: producto.id })}>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
