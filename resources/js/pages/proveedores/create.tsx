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
import { BookCheck, PlaneIcon } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proveedores',
        href: '/proveedores',
    },
];

export default function CrearProveedoresPage() {
    // Manejo del Formulario
    const { data, setData, post, reset, errors, processing } = useForm({
        nombre_proveedor: '',
        telefono_proveedor: '',
        correo_proveedor: '',
        localidad_proveedor: '',
        notas_proveedor: '',
    });

    // Funcion para enviar el formulario
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('proveedores.store'), {
            onSuccess: () => {
                // Limpia el formulario después de enviar
                reset();
                toast.success('Proveedor creado correctamente');
            },
            onError: () => {
                toast.error('Error al crear proveedor');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Categoría" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            {/* Contenido principal */}
                            <HeadingSmall title="Proveedores" description="Gestión de los Proveedores del Negocio" />
                            {/* Ícono semitransparente */}
                            <PlaneIcon
                                size={70}
                                color="#34d399"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-normal p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('proveedores.index')}>
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

                {/* Formulario para crear Proveedor */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Nombre Proveedor */}
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_proveedor">Nombre del Proveedor</Label>
                        <Input
                            id="nombre_proveedor"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.nombre_proveedor}
                            onChange={(e) => setData('nombre_proveedor', e.target.value)}
                            autoComplete="nombre_proveedor"
                            placeholder="Nombre del Proveedor"
                        />
                        <InputError className="mt-2" message={errors.nombre_proveedor} />
                    </div>
                    {/* Telefono proveedor */}
                    <div className="grid gap-2">
                        <Label htmlFor="telefono_proveedor">Contacto del Proveedor</Label>
                        <Input
                            id="telefono_proveedor"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.telefono_proveedor}
                            onChange={(e) => setData('telefono_proveedor', e.target.value)}
                            autoComplete="telefono_proveedor"
                            type="tel"
                            placeholder="+1 53 555 724 30"
                        />
                        <InputError className="mt-2" message={errors.telefono_proveedor} />
                    </div>
                    {/* Correro del Proveedor */}
                    <div className="grid gap-2">
                        <Label htmlFor="correp_proveedor">Correo electrónico del Proveedor</Label>
                        <Input
                            id="correo_proveedor"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.correo_proveedor}
                            type="email"
                            onChange={(e) => setData('correo_proveedor', e.target.value)}
                            autoComplete="correo_proveedor"
                            placeholder="Correo electrónico del Proveedor"
                        />
                        <InputError className="mt-2" message={errors.correo_proveedor} />
                    </div>
                    {/* Localidad del Proveedor */}
                    <div className="grid gap-2">
                        <Label htmlFor="localidad_proveedor">Localidad del Proveedor</Label>
                        <Input
                            id="localidad_proveedor"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.localidad_proveedor}
                            onChange={(e) => setData('localidad_proveedor', e.target.value)}
                            autoComplete="localidad_proveedor"
                            placeholder="Ciudad o dirección postal del Proveedor"
                        />
                        <InputError className="mt-2" message={errors.localidad_proveedor} />
                    </div>
                    {/* Notas del Proveedor */}
                    <div className="grid gap-2">
                        <Label htmlFor="notas_proveedor">Notas del Proveedor</Label>
                        <Textarea
                            id="notas_proveedor"
                            className="mt-1 block w-1/3"
                            value={data.notas_proveedor}
                            onChange={(e) => setData('notas_proveedor', e.target.value)}
                            autoComplete="notas_proveedor"
                            placeholder="Notas del Proveedor"
                        />
                        <InputError className="mt-2" message={errors.notas_proveedor} />
                    </div>

                    {/* Boton Enviar */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            Agregar Proveedor
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
