import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { AlmacenProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, LucideWarehouse } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Almacenes',
        href: '/almacenes',
    },
    {
        title: 'Editar Almacén',
        href: '#',
    },
];

// export interface AlmacenProps {
//     id: number;
//     nombre_almacen: string;
//     telefono_almacen: string;
//     correo_almacen: string | null;
//     provincia_almacen: string | null;
//     ciudad_almacen: string | null;
//     notas_almacen: string | null;
//     created_at: string;
//     updated_at: string;
// }

export default function EditarAlmacenesPage({ almacen }: { almacen: AlmacenProps }) {
    // Manejo del formulario con useForm
    const { data, setData, put, errors, processing } = useForm({
        nombre_almacen: almacen.nombre_almacen,
        telefono_almacen: almacen.telefono_almacen,
        correo_almacen: almacen.correo_almacen || '',
        provincia_almacen: almacen.provincia_almacen || '',
        ciudad_almacen: almacen.ciudad_almacen || '',
        notas_almacen: almacen.notas_almacen || '',
    });

    // Función para enviar el formulario
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('almacenes.update', { almacen: almacen.id }), {
            onSuccess: () => {
                toast.success('Almacén actualizado correctamente');
            },
            onError: () => {
                toast.error('Error al actualizar el almacén');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Almacén" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Editar Almacén" description="Modifica los datos del almacén" />
                        {/* Ícono semitransparente */}
                        <LucideWarehouse
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
                                    <Link href={route('almacenes.index')}>
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

                {/* Formulario para Editar Almacén */}
                <form onSubmit={submit} className="space-y-6 px-4 pb-6">
                    {/* Campo Nombre del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_almacen">Nombre del Almacén:</Label>
                        <Input
                            id="nombre_almacen"
                            className="mt-1 block w-1/3"
                            value={data.nombre_almacen}
                            onChange={(e) => setData('nombre_almacen', e.target.value)}
                            autoComplete="nombre_almacen"
                            placeholder="Nombre del Almacén"
                        />
                        <InputError className="mt-2" message={errors.nombre_almacen} />
                    </div>

                    {/* Campo Teléfono del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="telefono_almacen">Teléfono del Almacén:</Label>
                        <Input
                            id="telefono_almacen"
                            type="tel"
                            className="mt-1 block w-1/3"
                            value={data.telefono_almacen}
                            onChange={(e) => setData('telefono_almacen', e.target.value)}
                            autoComplete="telefono_almacen"
                            placeholder="Teléfono del Almacén"
                        />
                        <InputError className="mt-2" message={errors.telefono_almacen} />
                    </div>

                    {/* Campo Correo del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="correo_almacen">Correo del Almacén:</Label>
                        <Input
                            id="correo_almacen"
                            type="email"
                            className="mt-1 block w-1/3"
                            value={data.correo_almacen}
                            onChange={(e) => setData('correo_almacen', e.target.value)}
                            autoComplete="correo_almacen"
                            placeholder="Correo del Almacén"
                        />
                        <InputError className="mt-2" message={errors.correo_almacen} />
                    </div>

                    {/* Campo Provincia del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="provincia_almacen">Provincia del Almacén:</Label>
                        <Input
                            id="provincia_almacen"
                            className="mt-1 block w-1/3"
                            value={data.provincia_almacen}
                            onChange={(e) => setData('provincia_almacen', e.target.value)}
                            autoComplete="provincia_almacen"
                            placeholder="Provincia del Almacén"
                        />
                        <InputError className="mt-2" message={errors.provincia_almacen} />
                    </div>

                    {/* Campo Ciudad del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="ciudad_almacen">Ciudad del Almacén:</Label>
                        <Input
                            id="ciudad_almacen"
                            className="mt-1 block w-1/3"
                            value={data.ciudad_almacen}
                            onChange={(e) => setData('ciudad_almacen', e.target.value)}
                            autoComplete="ciudad_almacen"
                            placeholder="Ciudad del Almacén"
                        />
                        <InputError className="mt-2" message={errors.ciudad_almacen} />
                    </div>

                    {/* Campo Notas del Almacén */}
                    <div className="grid gap-2">
                        <Label htmlFor="notas_almacen">Notas del Almacén:</Label>
                        <Textarea
                            id="notas_almacen"
                            className="mt-2 block w-1/3"
                            value={data.notas_almacen}
                            onChange={(e) => setData('notas_almacen', e.target.value)}
                            autoComplete="notas_almacen"
                            placeholder="Notas del Almacén"
                        />
                        <InputError className="mt-2" message={errors.notas_almacen} />
                    </div>

                    {/* Botón Actualizar */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            Actualizar Almacén
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
