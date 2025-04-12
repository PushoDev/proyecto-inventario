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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { ProveedorProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, Edit3, ShoppingBagIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proveedores',
        href: '/proveedores',
    },
];

export default function ProveedoresPage({ proveedores }: { proveedores: ProveedorProps[] }) {
    // Función para eliminar un proveedor
    const deleteProveedor = (id: number) => {
        router.delete(route('proveedores.destroy', { proveedor: id }), {
            onSuccess: () => {
                toast.success('Proveedor eliminado correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar el proveedor');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proveedores" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="relative space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-400 bg-gray-500 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Proveedores" description="Gestión de los Proveedores del Negocio" />
                        {/* Ícono semitransparente */}
                        <ShoppingBagIcon
                            size={70}
                            color="blue"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-end p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('proveedores.create')}>
                                        <Button className="cursor-pointer bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">
                                            <BookCheck />
                                            Nuevo Proveedor
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Agregar Proveedor</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Tabla de Proveedores */}
                <Table className="mt-4">
                    <TableCaption>Lista de Proveedores del Negocio</TableCaption>
                    <TableHeader className="bg-sidebar">
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Localidad</TableHead>
                            <TableHead>Notas</TableHead>
                            <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>{proveedor.nombre_proveedor}</TableCell>
                                <TableCell>{proveedor.telefono_proveedor}</TableCell>
                                <TableCell>{proveedor.correo_proveedor || 'N/A'}</TableCell>
                                <TableCell>{proveedor.localidad_proveedor}</TableCell>
                                <TableCell>{proveedor.notas_proveedor || 'Sin notas'}</TableCell>
                                <TableCell className="text-right">
                                    {/* Botón Editar */}
                                    <Link href={route('proveedores.edit', { proveedor: proveedor.id })}>
                                        <Button variant="outline" className="cursor-pointer hover:bg-blue-900 hover:text-white">
                                            <Edit3 />
                                        </Button>
                                    </Link>
                                    {/* Diálogo de Confirmación para Eliminar */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="hover:bg-destructive cursor-pointer hover:text-white">
                                                <Trash2 />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-center">Atención</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    ¿Estás seguro de eliminar este proveedor? Esta acción es irreversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogAction
                                                    onClick={() => deleteProveedor(proveedor.id)}
                                                    className="bg-destructive cursor-pointer hover:bg-red-300"
                                                >
                                                    Aceptar
                                                </AlertDialogAction>
                                                <AlertDialogCancel className="cursor-pointer hover:bg-emerald-300 hover:text-emerald-950">
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
                            <TableCell colSpan={5} className="bg-gray-700">
                                Total de Proveedores
                            </TableCell>
                            <TableCell className="bg-gray-500 text-center">{proveedores.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}
