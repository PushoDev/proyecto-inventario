import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LucideWarehouse, X } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resumen General',
        href: '/dashboard',
    },
    {
        title: 'Almacenes',
        href: '/almacenes',
    },
    {
        title: 'Crear Almacen',
        href: '#',
    },
];

export default function CrearAlmacenesPage() {
    const { data, setData, post, reset, errors, processing } = useForm({
        nombre_almacen: '',
        telefono_almacen: '',
        correo_almacen: '',
        provincia_almacen: '',
        ciudad_almacen: '',
        notas_almacen: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('almacenes.store'), {
            onSuccess: () => {
                reset();
                toast.success('Almacén creado correctamente');
            },
            onError: () => {
                toast.error('Error al crear el almacén');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar nuevo Almacén" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <HeadingSmall title="Almacenes" description="Tiendas o almacén para guardar los Productos" />
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
                    <div className="flex justify-normal p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('almacenes.index')}>
                                        <Button className="cursor-pointer bg-red-400 text-red-950 hover:bg-red-900 hover:text-white">
                                            <X />
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

                {/* Formulario */}

                <form onSubmit={submit} className="grid grid-cols-1 gap-6 px-4 pb-6 md:grid-cols-2">
                    {/* Nombre del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="nombre_almacen">Nombre del Almacén</Label>
                        <Input
                            id="nombre_almacen"
                            value={data.nombre_almacen}
                            onChange={(e) => setData('nombre_almacen', e.target.value)}
                            placeholder="Nombre del Almacén"
                            autoComplete="nombre_almacen"
                        />
                        <InputError message={errors.nombre_almacen} />
                    </div>

                    {/* Teléfono del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="telefono_almacen">Teléfono del Almacén</Label>
                        <Input
                            id="telefono_almacen"
                            type="tel"
                            value={data.telefono_almacen}
                            onChange={(e) => setData('telefono_almacen', e.target.value)}
                            placeholder="Teléfono del Almacén"
                            autoComplete="telefono_almacen"
                        />
                        <InputError message={errors.telefono_almacen} />
                    </div>

                    {/* Correo del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="correo_almacen">Correo del Almacén</Label>
                        <Input
                            id="correo_almacen"
                            type="email"
                            value={data.correo_almacen}
                            onChange={(e) => setData('correo_almacen', e.target.value)}
                            placeholder="Correo del Almacén"
                            autoComplete="correo_almacen"
                        />
                        <InputError message={errors.correo_almacen} />
                    </div>

                    {/* Provincia del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="provincia_almacen">Provincia del Almacén</Label>
                        <Input
                            id="provincia_almacen"
                            value={data.provincia_almacen}
                            onChange={(e) => setData('provincia_almacen', e.target.value)}
                            placeholder="Provincia del Almacén"
                            autoComplete="provincia_almacen"
                        />
                        <InputError message={errors.provincia_almacen} />
                    </div>

                    {/* Ciudad del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="ciudad_almacen">Ciudad del Almacén</Label>
                        <Input
                            id="ciudad_almacen"
                            value={data.ciudad_almacen}
                            onChange={(e) => setData('ciudad_almacen', e.target.value)}
                            placeholder="Ciudad del Almacén"
                            autoComplete="ciudad_almacen"
                        />
                        <InputError message={errors.ciudad_almacen} />
                    </div>

                    {/* Notas del Almacen (Ocupa las dos columnas) */}
                    <div className="col-span-1 space-y-2 md:col-span-2">
                        <Label htmlFor="notas_almacen">Notas del Almacén</Label>
                        <Textarea
                            id="notas_almacen"
                            value={data.notas_almacen}
                            onChange={(e) => setData('notas_almacen', e.target.value)}
                            placeholder="Notas del Almacén"
                            rows={4}
                        />
                        <InputError message={errors.notas_almacen} />
                    </div>

                    {/* Botón Enviar (Ocupa las dos columnas) */}
                    <div className="col-span-1 flex justify-end md:col-span-2">
                        <Button type="submit" disabled={processing} className="w-full md:w-auto">
                            {processing ? 'Guardando...' : 'Crear Almacén'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
