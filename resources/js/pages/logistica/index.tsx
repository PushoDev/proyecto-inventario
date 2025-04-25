import HeadingSmall from '@/components/heading-small';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { LogisticaProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ChartColumnBigIcon,
    Handshake,
    Package,
    PackageOpen,
    PiggyBank,
    PlaneIcon,
    PlaneTakeoffIcon,
    SquareCheckBig,
    SquareCheckIcon,
} from 'lucide-react';
import * as React from 'react';

// Section Card
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
// Calendario
import { Calendar } from '@/components/ui/calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes Generales',
        href: '/reportes',
    },
    {
        title: 'Logistica del Negocio',
        href: '/logistica',
    },
];

export default function LogisticaPage({
    totalCategorias,
    categoriasActivas,
    totalClientes,
    totalProveedores,
    totalProductos,
    totalUnidades,
    inversionTotal,
    totalCuentas,
    saldoCuentas,
    montoGeneralInvertido,
}: LogisticaProps) {
    // Calendario
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Logistica" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menús */}
                <div>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            {/* Contenido principal */}
                            <HeadingSmall title="Logistica" description="Logistica del Negocio, resumenes interáctivos e información general" />

                            {/* Ícono semitransparente */}
                            <ChartColumnBigIcon
                                size={70}
                                color="white"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="my-4" />
                    </div>

                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <Card className="@container/card col-span-3">
                            <CardHeader className="relative">
                                <CardDescription>New Customers</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,234</CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingDownIcon className="size-3" />
                                        -20%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Down 20% this period <TrendingDownIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Acquisition needs attention</div>
                            </CardFooter>
                        </Card>
                        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow" />
                    </div>

                    <Separator className="my-2" />
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        {/* Total Monto */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Monto General</CardDescription>
                                <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">
                                    $ {montoGeneralInvertido}.00
                                </CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3" />
                                        +12.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Monto en Productos <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Visitors for the last 6 months</div>
                            </CardFooter>
                        </Card>
                        {/* Total Inversion */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Total Inversión</CardDescription>
                                <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">
                                    $ {inversionTotal}
                                </CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3" />
                                        {totalProductos}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Monto en Productos <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Visitors for the last 6 months</div>
                            </CardFooter>
                        </Card>
                        {/* Total Cuentas */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Total Cuentas</CardDescription>
                                <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">
                                    $ {saldoCuentas}.00
                                </CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <PiggyBank className="size-3" />
                                        {totalCuentas}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Monto en Productos <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Visitors for the last 6 months</div>
                            </CardFooter>
                        </Card>
                        {/* Total Deudas */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Total Deudas</CardDescription>
                                <CardTitle className="text-2xl font-semibold text-red-400 tabular-nums @[250px]/card:text-3xl">
                                    $ {inversionTotal}
                                </CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3" />
                                        +12.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Monto en Productos <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Visitors for the last 6 months</div>
                            </CardFooter>
                        </Card>
                    </div>

                    <Separator className="my-2" />
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        {/* Productos */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Productos</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalProductos}</CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs text-amber-600">
                                        <PackageOpen className="size-3" />
                                        {totalUnidades} Unidades
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Todos los Producto <Package className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Todos distribuidos en los almacenes</div>
                            </CardFooter>
                        </Card>
                        {/* Proveedores */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Proveedores</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalProveedores}</CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <PlaneTakeoffIcon className="size-3" />
                                        {totalProveedores}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Todos Adquiridos <PlaneIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Adquirir Productos</div>
                            </CardFooter>
                        </Card>
                        {/* Clientes */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Clientes</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalClientes}</CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <Handshake className="size-3" />
                                        +12.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Strong user retention <Handshake className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Engagement exceed targets</div>
                            </CardFooter>
                        </Card>
                        {/* Categorias */}
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Categorias</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalCategorias}</CardTitle>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs text-emerald-500">
                                        <SquareCheckBig className="size-3" />
                                        {categoriasActivas}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Steady performance <SquareCheckIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Meets growth projections</div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
