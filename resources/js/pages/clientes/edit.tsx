import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { ClienteProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, Handshake } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];

export default function EditarClientesPage({ cliente }: { cliente: ClienteProps }) {
    alert(cliente);
    // Manejo del formulario con useForm
    const { data, setData, put, errors, processing } = useForm({
        nombre_cliente: cliente.nombre_cliente,
        telefono_cliente: cliente.telefono_cliente,
        direccion_cliente: cliente.direccion_cliente || '',
        ciudad_cliente: cliente.ciudad_cliente || '',
    });

    // Función para enviar el formulario
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('clientes.update', { cliente: cliente.id }), {
            onSuccess: () => {
                toast.success('Cliente actualizado correctamente');
            },
            onError: () => {
                toast.error('Error al actualizar el cliente');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            {/* Contenido principal */}
                            <HeadingSmall title="Clientes" description="Gestión de los Clientes del Negocio" />
                            {/* Ícono semitransparente */}
                            <Handshake
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

                {/* Formulario para Editar Cliente */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Campo Nombre del Cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_cliente">Nombre del Cliente:</Label>
                        <Input
                            id="nombre_cliente"
                            className="mt-1 block w-1/3"
                            value={data.nombre_cliente}
                            onChange={(e) => setData('nombre_cliente', e.target.value)}
                            autoComplete="nombre_cliente"
                            placeholder="Nombre del Cliente"
                        />
                        <InputError className="mt-2" message={errors.nombre_cliente} />
                    </div>

                    {/* Campo Teléfono del Cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="telefono_cliente">Teléfono del Cliente:</Label>
                        <Input
                            id="telefono_cliente"
                            className="mt-1 block w-1/3"
                            value={data.telefono_cliente}
                            onChange={(e) => setData('telefono_cliente', e.target.value)}
                            autoComplete="telefono_cliente"
                            placeholder="Teléfono del Cliente"
                        />
                        <InputError className="mt-2" message={errors.telefono_cliente} />
                    </div>

                    {/* Campo Dirección del Cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="direccion_cliente">Dirección del Cliente:</Label>
                        <Input
                            id="direccion_cliente"
                            className="mt-1 block w-1/3"
                            value={data.direccion_cliente}
                            onChange={(e) => setData('direccion_cliente', e.target.value)}
                            autoComplete="direccion_cliente"
                            placeholder="Dirección del Cliente"
                        />
                        <InputError className="mt-2" message={errors.direccion_cliente} />
                    </div>

                    {/* Campo Ciudad del Cliente */}
                    <div className="grid gap-2">
                        <Label htmlFor="ciudad_cliente">Ciudad del Cliente:</Label>
                        <Input
                            id="ciudad_cliente"
                            className="mt-1 block w-1/3"
                            value={data.ciudad_cliente}
                            onChange={(e) => setData('ciudad_cliente', e.target.value)}
                            autoComplete="ciudad_cliente"
                            placeholder="Ciudad del Cliente"
                        />
                        <InputError className="mt-2" message={errors.ciudad_cliente} />
                    </div>

                    {/* Botón Actualizar */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            Actualizar Cliente
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
