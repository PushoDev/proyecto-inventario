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
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { AlmacenProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, Edit3, LucideWarehouse, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Almacenes',
        href: '/almacenes',
    },
];

export default function AlmacenesPage({ almacenes }: { almacenes: AlmacenProps[] }) {
    // Función para eliminar un almacén
    const deleteAlmacen = (id: number) => {
        router.delete(route('almacenes.destroy', { almacen: id }), {
            onSuccess: () => {
                toast.success('Almacén eliminado correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar el almacén');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Almacenes" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Almacenes" description="Tiendas o almacén para guardar los Productos" />

                        {/* Ícono semitransparente */}
                        <LucideWarehouse
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                        />
                    </div>
                </div>
                {/* Barra de Menús */}
                <div>
                    <Separator className="my-4" />
                    <div className="flex justify-end p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('almacenes.create')}>
                                        <Button className="cursor-pointer bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">
                                            <BookCheck />
                                            Nuevo Almacén
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Agregar Almacén</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Tabla de Almacenes */}
                <Table>
                    <TableHeader className="bg-sidebar">
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Provincia</TableHead>
                            <TableHead>Ciudad</TableHead>
                            <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {almacenes.map((almacen) => (
                            <TableRow key={almacen.id}>
                                <TableCell>{almacen.nombre_almacen}</TableCell>
                                <TableCell>{almacen.telefono_almacen}</TableCell>
                                <TableCell>{almacen.correo_almacen || 'N/A'}</TableCell>
                                <TableCell>{almacen.provincia_almacen || 'N/A'}</TableCell>
                                <TableCell>{almacen.ciudad_almacen || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    {/* Botón Editar */}
                                    <Link href={route('almacenes.edit', { almacene: almacen.id })}>
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
                                                    ¿Estás seguro de eliminar este almacén? Esta acción es irreversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogAction
                                                    onClick={() => deleteAlmacen(almacen.id)}
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
                            <TableCell colSpan={5} className="bg-gray-700">
                                Total de Almacenes
                            </TableCell>
                            <TableCell className="bg-gray-500 text-center">{almacenes.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}
