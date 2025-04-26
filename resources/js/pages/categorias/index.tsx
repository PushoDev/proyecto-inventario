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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, CategoriasProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, CheckIcon, Edit3, MessageCircleWarningIcon, SquareCheckIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
];

export default function CategoriasPage({ categorias }: { categorias: CategoriasProps[] }) {
    // Función para eliminar una categoría
    const deleteCategoria = (id: number) => {
        router.delete(route('categorias.destroy', { categoria: id }), {
            onSuccess: () => {
                toast.success('Categoría eliminada correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar la categoría');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categorías" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <header>
                            <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                                {/* Contenido principal */}
                                <HeadingSmall title="Categorías" description="Clasificación de los Productos" />
                                {/* Ícono semitransparente */}
                                <SquareCheckIcon
                                    size={70}
                                    color="white"
                                    className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                                />
                            </div>
                            <Separator className="col-span-full my-4" />
                            {/* Separadors para ordenes */}
                            <div className="flex h-5 items-center space-x-4 text-sm">
                                <div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Link href={route('categorias.create')}>
                                                    <Button className="cursor-pointer bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">
                                                        <BookCheck />
                                                        Nueva Categoría
                                                    </Button>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Agregar Categorías</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Separator orientation="vertical" />
                                <div>Docs</div>
                                <Separator orientation="vertical" />
                                <div>Source</div>
                            </div>
                        </header>
                    </div>
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {/* Tabla de Categorías */}
                    <Table className="mt-4">
                        <TableCaption>Categorías de los Productos</TableCaption>
                        <TableHeader className="bg-sidebar">
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categorias.map((categoria) => (
                                <TableRow key={categoria.id}>
                                    <TableCell>{categoria.nombre_categoria}</TableCell>
                                    <TableCell>{categoria.descripcion_categoria || 'Sin descripción'}</TableCell>
                                    <TableCell>
                                        {categoria.activar_categoria ? (
                                            <Badge variant="outline" className="text-emerald-500">
                                                <CheckIcon />
                                                Categoria Activa
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-red-700">
                                                <MessageCircleWarningIcon />
                                                Categoria Inactiva
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* Botón Editar */}
                                        <Link href={route('categorias.edit', { categoria: categoria.id })}>
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
                                                        ¿Estás seguro de eliminar la categoría? Esta acción es irreversible.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogAction
                                                        onClick={() => deleteCategoria(categoria.id)}
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
                                <TableCell colSpan={3} className="bg-gray-700">
                                    Total de Categorías
                                </TableCell>
                                <TableCell className="bg-gray-500 text-center">{categorias.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
