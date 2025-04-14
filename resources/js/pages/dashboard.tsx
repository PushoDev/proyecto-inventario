import WidgetCompra from '@/components/extras/home/WidgetCompra';
import WidgetInventario from '@/components/extras/home/WidgetInventario';
import WidgetTransacciones from '@/components/extras/home/WidgetTransacciones';
import WidgetVenta from '@/components/extras/home/WidgetVenta';
import HeadingSmall from '@/components/heading-small';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ComputerIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Caja Principal',
        href: '/dashboard',
    },
];

export default function CajaGeneral() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caja Principal" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall
                            title="Opciones Generales del Sistema"
                            description="Gestión del Negocio. Utilice las opciones requeridas para su funcionamineto"
                        />
                        {/* Ícono semitransparente */}
                        <ComputerIcon
                            size={70}
                            color="#f43f5e"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {/* Tabla de la disponibilidad de las Cuentas */}
                    <Table className="animate__animated animate__backInDown mt-4">
                        <TableCaption className="rounded-2xl bg-amber-800 text-white">Capitales Generales del Negocio</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="bg-amber-950 text-center font-bold text-white">DESCRIPCIÓN</TableHead>
                                <TableHead className="bg-amber-950 text-center font-bold text-white">MONTO</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="bg-amber-700 font-bold text-white">CAPITAL</TableCell>
                                <TableCell className="bg-amber-800 text-right text-white">1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="bg-amber-700 font-bold text-white">MONEDA NACIONAL</TableCell>
                                <TableCell className="bg-amber-800 text-right text-white">1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="bg-amber-700 font-bold text-white">EURO</TableCell>
                                <TableCell className="bg-amber-800 text-right text-white">1</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>TOTALES</TableCell>
                                <TableCell>$ 25.000</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    {/* Tabla de Acciones del Mes */}
                    <Table className="animate__animated animate__backInDown mt-4">
                        <TableCaption className="rounded-2xl bg-emerald-800 text-white">Movimieneto del Mes</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="bg-emerald-900">TOTAL</TableHead>
                                <TableHead colSpan={2} className="bg-emerald-950 text-center">
                                    $ 30000
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="bg-emerald-600">MES ANTERIOR</TableCell>
                                <TableCell className="bg-emerald-950">$ 245 000</TableCell>
                                <TableCell>$ 25.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="bg-emerald-600">USD TOTAL ACTIVO</TableCell>
                                <TableCell className="bg-emerald-950">$ 25.000</TableCell>
                                <TableCell className="cursor-pointer"> $ 375</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="bg-emerald-600">FONDO M NACIONAL ACTIVO</TableCell>
                                <TableCell className="bg-emerald-950">1</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>TASA DE CAMBIO</TableCell>
                                <TableCell className="cursor-pointer bg-emerald-600 text-center hover:bg-emerald-800">$ 375</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
                <Separator className="mt-4" />
                <div className="animate__animated animate__backInUp grid auto-rows-min gap-4 md:grid-cols-4">
                    <WidgetCompra />
                    <WidgetVenta />
                    <WidgetTransacciones />
                    <WidgetInventario />
                </div>
                <Separator className="mt-4" />
            </div>
        </AppLayout>
    );
}
