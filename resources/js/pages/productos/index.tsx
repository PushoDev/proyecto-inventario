import HeadingSmall from '@/components/heading-small';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ProductosProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit3, PackageOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];

export default function ProductosPage({ productos }: { productos: ProductosProps[] }) {
    // Eliminar o dar de Baja Producto
    const eliminarProducto = (id: number) => {
        router.delete(route('productos.destroy', { producto: id }), {
            onSuccess: () => {
                toast.success('Producto eliminado correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar el Producto');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos en la Glorieta.Shop" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Productos Adquiridos" description="Gestión de los productos disponibles del negocio" />
                        {/* Ícono semitransparente */}
                        <PackageOpen
                            size={70}
                            color="#f59e0b"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator />
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <Table>
                        <TableCaption>Productos Disponibles en el Negocio</TableCaption>
                        <TableHeader className="bg-sidebar rounded-2xl">
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-center">Imagen</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Unidades</TableHead>
                            <TableHead>Precio Invertido</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                        </TableHeader>
                        <TableBody>
                            {productos.map((producto) => (
                                <TableRow key={producto.id}>
                                    <TableCell>{producto.nombre_producto}</TableCell>
                                    <TableCell className="text-center">
                                        {producto.imagen_url ? (
                                            <img
                                                src={producto.imagen_url}
                                                alt={`Imagen de ${producto.nombre_producto}`}
                                                className="mx-auto h-16 w-16 rounded-md object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-500">Sin Imagen</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{producto.categoria || 'Sin Categoría'}</TableCell>
                                    <TableCell>{producto.marca_producto || 'Sin Marca'}</TableCell>
                                    <TableCell>{producto.codigo_producto || 'Sin Código'}</TableCell>
                                    <TableCell>{producto.cantidad_producto}</TableCell>
                                    <TableCell className="text-left">$ {producto.precio_compra_producto.toFixed(2)}</TableCell>
                                    <TableCell>$ {(producto.cantidad_producto * producto.precio_compra_producto).toFixed(2)}</TableCell>

                                    {/* Opciones de los Productos */}
                                    <TableCell className="text-right">
                                        {/* Botón Editar */}
                                        <Link href={route('productos.edit', { producto: producto.id })}>
                                            <Button
                                                variant="outline"
                                                className="cursor-pointer hover:bg-blue-900 hover:text-white dark:hover:bg-blue-700"
                                            >
                                                <Edit3 />
                                            </Button>
                                        </Link>

                                        {/* Diálogo de Confirmación para Eliminar */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="hover:bg-destructive dark:hover:bg-destructive ms-2 cursor-pointer hover:text-white"
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-center">Atención</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        ¿Estás seguro de eliminar este producto? Esta acción es irreversible.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogAction
                                                        onClick={() => eliminarProducto(producto.id)}
                                                        className="bg-destructive cursor-pointer hover:bg-red-300"
                                                    >
                                                        Aceptar
                                                    </AlertDialogAction>
                                                    <AlertDialogCancel className="cursor-pointer text-white hover:bg-emerald-300 hover:text-emerald-950 dark:hover:bg-emerald-300 dark:hover:text-emerald-950">
                                                        Cancelar
                                                    </AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Total de Productos</TableCell>
                                <TableCell className="bg-amber-300 text-amber-950">{productos.length} Productos</TableCell>
                                <TableCell className="bg-emerald-700 text-emerald-950">
                                    {productos.reduce((total, item) => total + item.cantidad_producto, 0)} Unidades
                                </TableCell>
                                <TableCell colSpan={2} className="bg-amber-800 text-center text-amber-300">
                                    $
                                    {productos
                                        .reduce((total, producto) => total + producto.precio_compra_producto * producto.cantidad_producto, 0)
                                        .toFixed(2)}
                                </TableCell>
                                <TableCell className="text-sidebar-accent text-right">Acciones</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
