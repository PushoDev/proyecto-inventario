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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { AlmacenProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, Edit3, Trash2, WarehouseIcon } from 'lucide-react';
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
                {/* Barra de Menús */}
                <div>
                    <div className="relative space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-400 bg-gray-500 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Almacenes" description="Gestión de los Almacenes del Negocio" />

                        {/* Ícono semitransparente */}
                        <WarehouseIcon
                            size={70}
                            color="white"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                        />
                    </div>
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
                </Table>
            </div>
        </AppLayout>
    );
}
