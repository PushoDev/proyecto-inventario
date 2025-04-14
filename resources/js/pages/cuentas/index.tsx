import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CircleDollarSignIcon, HandCoins, Wallet2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cuentas',
        href: '/cuentas',
    },
];

export default function Cuentas() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caja Principal" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall
                            title="Cuentas Monetarias"
                            description="Gestión de Cuentas fiscales, monetarias y deudas pendientes a Proveedores"
                        />
                        {/* Ícono semitransparente */}
                        <HandCoins
                            size={70}
                            color="green"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                </div>
                <Separator className="mt-2" />
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {/* Deudas a Proveedores */}
                    <div className="mt-4 rounded-xl border-1 border-red-900">
                        <div className="flex justify-end">
                            <Button variant="outline" className="cursor-pointer hover:dark:bg-amber-700">
                                <CircleDollarSignIcon />
                                Pagar Deuda
                            </Button>
                        </div>
                        <Table className="mt-4">
                            <TableCaption className="bg-destructive rounded-2xl text-white">Montos Pendientes a Pagar</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">PROVEEDOR</TableHead>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">MONTO</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="bg-red-700 font-bold text-white">Amazon Ecommerce</TableCell>
                                    <TableCell className="bg-red-800 text-center text-white">$ 550</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TOTALES</TableCell>
                                    <TableCell className="bg-destructive cursor-none text-center">$ 550</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>

                    {/* Cuentas al Negocio */}
                    <div className="mt-4 rounded-xl border-2 border-emerald-600">
                        <div className="flex justify-end">
                            <Button variant="outline" className="cursor-pointer hover:animate-pulse hover:dark:bg-emerald-700">
                                <Wallet2Icon />
                                Agregar Cuenta
                            </Button>
                        </div>
                        <Table className="mt-4">
                            <TableCaption className="rounded-2xl bg-emerald-800 text-white">Cuentas del Negocio</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-emerald-950 text-center">NOMBRE DE CUENTA</TableHead>
                                    <TableHead className="bg-emerald-950 text-center">MONTO</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="bg-emerald-600">El TOCO</TableCell>
                                    <TableCell className="bg-emerald-900 text-center">$ 245 000</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TOTAL FINACIERO</TableCell>
                                    <TableCell className="cursor-none bg-emerald-950 text-center">$ 245 000</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
