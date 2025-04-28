import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { CuentaNegocioProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookCheck, HandCoins } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistica General',
        href: '/logistica',
    },
    {
        title: 'Cuentas',
        href: '/cuentas',
    },
    {
        title: 'Editar Cuenta',
        href: '',
    },
];

export default function EditCuenta({ cuenta }: { cuenta: CuentaNegocioProps }) {
    // Hook de formulario de Inertia.js
    const { data, setData, put, processing, errors } = useForm({
        nombre_cuenta: cuenta.nombre_cuenta,
        saldo_cuenta: cuenta.saldo_cuenta,
        tipo_cuenta: cuenta.tipo_cuenta as 'permanentes' | 'temporales', // Asegurar el tipo correcto aquí
        notas_cuenta: cuenta.notas_cuenta || '',
    });

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('cuentas.update', cuenta.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cuenta Monetaria" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <header>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            <HeadingSmall title="Editar Cuenta" description="Modifica los detalles de esta cuenta fiscal o monetaria" />
                            <HandCoins
                                size={70}
                                color="green"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={route('cuentas.index')}>
                                                <Button className="hover:bg-destructive cursor-pointer bg-red-400 hover:text-white">
                                                    <BookCheck />
                                                    Cancelar
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Cancelar Acción</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Separator orientation="vertical" />
                        </div>
                    </header>
                </div>

                {/* Formulario para Editar Cuentas */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
                        {/* Campo: Nombre de la Cuenta */}
                        <div className="mb-4">
                            <Label htmlFor="nombre_cuenta">Nombre de la Cuenta</Label>
                            <Input
                                id="nombre_cuenta"
                                name="nombre_cuenta"
                                value={data.nombre_cuenta}
                                onChange={(e) => setData('nombre_cuenta', e.target.value)}
                                placeholder="Ej. Cuenta Principal"
                                required
                            />
                            {errors.nombre_cuenta && <p className="mt-1 text-sm text-red-500">{errors.nombre_cuenta}</p>}
                        </div>

                        {/* Campo: Saldo de la Cuenta */}
                        <div className="mb-4">
                            <Label htmlFor="saldo_cuenta">Saldo Actual</Label>
                            <Input
                                id="saldo_cuenta"
                                name="saldo_cuenta"
                                type="number"
                                step="0.01"
                                value={data.saldo_cuenta ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value.trim();
                                    setData('saldo_cuenta', value === '' ? null : parseFloat(value));
                                }}
                                placeholder="Ej. 1000.00"
                            />
                            {errors.saldo_cuenta && <p className="mt-1 text-sm text-red-500">{errors.saldo_cuenta}</p>}
                        </div>

                        {/* Campo: Tipo de Cuenta */}
                        <div className="mb-4">
                            <Label htmlFor="tipo_cuenta">Tipo de Cuenta</Label>
                            <Select value={data.tipo_cuenta} onValueChange={(value) => setData('tipo_cuenta', value)}>
                                <SelectTrigger id="tipo_cuenta">
                                    <SelectValue placeholder="Selecciona un tipo de cuenta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tipo de Cuenta</SelectLabel>
                                        <SelectItem value="permanentes">Permanente</SelectItem>
                                        <SelectItem value="temporales">Temporal</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.tipo_cuenta && <p className="mt-1 text-sm text-red-500">{errors.tipo_cuenta}</p>}
                        </div>

                        {/* Campo: Notas de la Cuenta */}
                        <div className="mb-4">
                            <Label htmlFor="notas_cuenta">Notas Adicionales</Label>
                            <Textarea
                                id="notas_cuenta"
                                name="notas_cuenta"
                                value={data.notas_cuenta}
                                onChange={(e) => setData('notas_cuenta', e.target.value)}
                                placeholder="Escribe notas adicionales sobre esta cuenta..."
                            />
                            {errors.notas_cuenta && <p className="mt-1 text-sm text-red-500">{errors.notas_cuenta}</p>}
                        </div>

                        {/* Botón de Envío */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
