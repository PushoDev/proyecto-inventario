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
import { ClienteProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, Edit3, ShoppingBasketIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function ClientesPage({ clientes }: { clientes: ClienteProps[] }) {
    // Función para eliminar un cliente
    const deleteCliente = (id: number) => {
        router.delete(route('clientes.destroy', { cliente: id }), {
            onSuccess: () => {
                toast.success('Cliente eliminado correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar el cliente');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes del Negocio" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="relative space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-400 bg-gray-500 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Clientes" description="Gestión de los Clientes del Negocio" />
                        {/* Ícono semitransparente */}
                        <ShoppingBasketIcon
                            size={70}
                            color="yellow"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-end p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('clientes.create')}>
                                        <Button className="cursor-pointer bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">
                                            <BookCheck />
                                            Nuevo Cliente
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Agregar Cliente</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Tabla de Clientes */}
                <Table className="mt-4">
                    <TableCaption>Lista de Clientes del Negocio</TableCaption>
                    <TableHeader className="bg-sidebar">
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead>Ciudad</TableHead>
                            <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell>{cliente.nombre_cliente}</TableCell>
                                <TableCell>{cliente.telefono_cliente}</TableCell>
                                <TableCell>{cliente.direccion_cliente || 'N/A'}</TableCell>
                                <TableCell>{cliente.ciudad_cliente || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    {/* Botón Editar */}
                                    <Link href={route('clientes.edit', { cliente: cliente.id })}>
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
                                                className="hover:bg-destructive dark:hover:bg-destructive cursor-pointer hover:text-white"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-center">Atención</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    ¿Estás seguro de eliminar este cliente? Esta acción es irreversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogAction
                                                    onClick={() => deleteCliente(cliente.id)}
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
                            <TableCell colSpan={4} className="bg-gray-700">
                                Total de Clientes
                            </TableCell>
                            <TableCell className="bg-gray-500 text-center">{clientes.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}
