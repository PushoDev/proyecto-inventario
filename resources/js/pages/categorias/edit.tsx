import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { CategoriasProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, SquareCheckIcon } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
];

export default function EditarCategoriasPage({ categoria }: { categoria: CategoriasProps }) {
    // Manejo del formulario con useForm
    const { data, setData, put, errors, processing } = useForm({
        nombre_categoria: categoria.nombre_categoria,
        descripcion_categoria: categoria.descripcion_categoria || '',
        activar_categoria: categoria.activar_categoria,
    });

    // Función para enviar el formulario
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categorias.update', { categoria: categoria.id }), {
            onSuccess: () => {
                toast.success('Categoría actualizada correctamente');
            },
            onError: () => {
                toast.error('Error al actualizar la categoría');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Categoría" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
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
                    <Separator className="my-4" />
                    <div className="flex justify-normal p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('categorias.index')}>
                                        <Button className="cursor-pointer bg-red-400 text-red-950 hover:bg-red-900 hover:text-white">
                                            <BookCheck />
                                            Cancelar
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Cancelar y regresar</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Formulario para Editar Categoría */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Campo Nombre de la Categoría */}
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_categoria">Nombre de la Categoría:</Label>
                        <Input
                            id="nombre_categoria"
                            className="mt-1 block w-1/3"
                            value={data.nombre_categoria}
                            onChange={(e) => setData('nombre_categoria', e.target.value)}
                            autoComplete="nombre_categoria"
                            placeholder="Nombre de la Categoría"
                        />
                        <InputError className="mt-2" message={errors.nombre_categoria} />
                    </div>

                    {/* Campo Descripción de la Categoría */}
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion_categoria">Descripción General de la Categoría:</Label>
                        <Textarea
                            id="descripcion_categoria"
                            className="mt-2 block w-1/3"
                            value={data.descripcion_categoria}
                            onChange={(e) => setData('descripcion_categoria', e.target.value)}
                            autoComplete="descripcion_categoria"
                            placeholder="Descripción de la Categoría"
                        />
                        <InputError className="mt-2" message={errors.descripcion_categoria} />
                    </div>

                    {/* Campo Estado de la Categoría */}
                    <div className="grid gap-2">
                        <Label htmlFor="activar_categoria">Estado de la Categoría:</Label>
                        <select
                            id="activar_categoria"
                            className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.activar_categoria ? 'true' : 'false'}
                            onChange={(e) => setData('activar_categoria', e.target.value === 'true')}
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                        <InputError className="mt-2" message={errors.activar_categoria} />
                    </div>

                    {/* Botón Actualizar */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            Actualizar Categoría
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
