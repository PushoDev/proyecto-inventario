import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, ShoppingBasketIcon } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function CrearClientesPage() {
    // Manejo del formulario
    const { data, setData, post, reset, errors, processing } = useForm({
        nombre_cliente: '',
        telefono_cliente: '',
        direccion_cliente: '',
        ciudad_cliente: '',
    });

    // Función para enviar el formulario
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('clientes.store'), {
            onSuccess: () => {
                // Limpia el formulario después de enviar
                reset();
                toast.success('Cliente creado correctamente');
            },
            onError: () => {
                toast.error('Error al crear cliente');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Categoría" />
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
                    <div className="flex justify-normal p-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('clientes.index')}>
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

                {/* Formulario para crear Clientes */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Campo nombre del cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_cliente">Nombre del cliente</Label>
                        <Input
                            id="nombre_cliente"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.nombre_cliente}
                            onChange={(e) => setData('nombre_cliente', e.target.value)}
                            autoComplete="nombre_cliente"
                            placeholder="Nombre del Cliente"
                        />
                        <InputError className="mt-2" message={errors.nombre_cliente} />
                    </div>
                    {/* Campo telefono del cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="telefonoe_cliente">Contacto del cliente</Label>
                        <Input
                            id="telefono_cliente"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.telefono_cliente}
                            onChange={(e) => setData('telefono_cliente', e.target.value)}
                            type="tel"
                            autoComplete="telefono_cliente"
                            placeholder="Telefono del Cliente"
                        />
                        <InputError className="mt-2" message={errors.telefono_cliente} />
                    </div>
                    {/* Direccion del cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="direccion_cliente">Dirección del cliente</Label>
                        <Input
                            id="direccion_cliente"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.direccion_cliente}
                            onChange={(e) => setData('direccion_cliente', e.target.value)}
                            autoComplete="direccion_cliente"
                            placeholder="Dirección del Cliente"
                        />
                        <InputError className="mt-2" message={errors.direccion_cliente} />
                    </div>
                    {/* Ciudad del cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="ciudad_cliente">Ciudad del cliente</Label>
                        <Input
                            id="ciudad_cliente"
                            className="mt-1 block w-1/3 focus:border-emerald-500"
                            value={data.ciudad_cliente}
                            onChange={(e) => setData('ciudad_cliente', e.target.value)}
                            autoComplete="ciudad_cliente"
                            placeholder="Ciudad del Cliente"
                        />
                        <InputError className="mt-2" message={errors.ciudad_cliente} />
                    </div>

                    {/* Boton Enviar */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            Crear Cliente
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
