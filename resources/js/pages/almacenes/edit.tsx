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
        put(route('almacenes.update', { almacene: almacen.id }), {
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
                <form onSubmit={submit} className="bg-card mx-auto mt-6 max-w-2xl space-y-6 rounded-xl p-6 shadow-md">
                    {/* Nombre del Almacén */}
                    <div className="space-y-2">
                        <Label htmlFor="nombre_almacen">Nombre del Almacén</Label>
                        <Input
                            id="nombre_almacen"
                            value={data.nombre_almacen}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nombre_almacen', e.target.value)}
                            placeholder="Ej: Almacén Principal"
                        />
                        <InputError message={errors.nombre_almacen} />
                    </div>

                    {/* Teléfono + Correo */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="telefono_almacen">Teléfono del Almacén</Label>
                            <Input
                                id="telefono_almacen"
                                type="tel"
                                value={data.telefono_almacen}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('telefono_almacen', e.target.value)}
                                placeholder="Ej: +53 5 123 4567"
                            />
                            <InputError message={errors.telefono_almacen} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="correo_almacen">Correo del Almacén</Label>
                            <Input
                                id="correo_almacen"
                                type="email"
                                value={data.correo_almacen}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('correo_almacen', e.target.value)}
                                placeholder="ejemplo@dominio.com"
                            />
                            <InputError message={errors.correo_almacen} />
                        </div>
                    </div>

                    {/* Provincia y Ciudad */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="provincia_almacen">Provincia del Almacén</Label>
                            <Input
                                id="provincia_almacen"
                                value={data.provincia_almacen}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('provincia_almacen', e.target.value)}
                                placeholder="Ej: Mayabeque"
                            />
                            <InputError message={errors.provincia_almacen} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ciudad_almacen">Ciudad del Almacén</Label>
                            <Input
                                id="ciudad_almacen"
                                value={data.ciudad_almacen}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('ciudad_almacen', e.target.value)}
                                placeholder="Ej: Quivicán"
                            />
                            <InputError message={errors.ciudad_almacen} />
                        </div>
                    </div>

                    {/* Notas del Almacen */}
                    <div className="space-y-2">
                        <Label htmlFor="notas_almacen">Notas del Almacén</Label>
                        <Textarea
                            id="notas_almacen"
                            value={data.notas_almacen}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('notas_almacen', e.target.value)}
                            rows={4}
                            placeholder="Información adicional..."
                        />
                        <InputError message={errors.notas_almacen} />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Guardando cambios...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
