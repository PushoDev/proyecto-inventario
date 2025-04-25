import WidgetInventario from '@/components/extras/home/WidgetInventario';
import WidgetTransacciones from '@/components/extras/home/WidgetTransacciones';
import WidgetVenta from '@/components/extras/home/WidgetVenta';
import HeadingSmall from '@/components/heading-small';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ComputerIcon, LucideBaggageClaim, ShoppingBagIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ClorietaShop',
        href: '#',
    },
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
                            color="#d6d3d1"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                </div>

                {/* Opciones */}
                <div className="animate__animated animate__backInUp grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* Comprar Nuevos Productos */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-red-800 to-red-400">
                        {/* Ícono de fondo transparente */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <ShoppingBagIcon className="h-48 w-48 text-white" />
                        </div>
                        {/* Contenido principal */}
                        <div className="relative z-10 h-full p-6">
                            {/* Ícono en la esquina superior izquierda */}
                            <div className="absolute top-4 left-4">
                                <LucideBaggageClaim className="h-8 w-8 text-white" />
                            </div>
                            {/* Textos alineados a la derecha */}
                            <div className="flex h-full flex-col items-end justify-center space-y-2">
                                <h3 className="font-sans text-4xl font-bold text-white">Compra</h3>
                                <span className="text-lg text-white">Adquirir Productos</span>
                            </div>
                            {/* Link */}
                            <Link href={route('comprar.index')}>
                                <button className="absolute right-4 bottom-4 ms-2 rounded-md bg-red-800 px-4 py-1 text-sm font-semibold text-white shadow-md transition duration-300 hover:animate-pulse hover:cursor-pointer hover:bg-white hover:text-red-800">
                                    Comprar
                                </button>
                            </Link>
                        </div>
                        {/* Patrón de fondo adicional */}
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    {/* <WidgetCompra /> */}
                    <WidgetVenta />
                    <WidgetTransacciones />
                    <WidgetInventario />
                </div>

                <Separator className="mt-4" />

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
            </div>
        </AppLayout>
    );
}
