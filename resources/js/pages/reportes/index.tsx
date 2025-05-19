import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistica Resumen',
        href: '/logistica',
    },
    {
        title: 'Reportes',
        href: '/reportes',
    },
];

export default function ReposrtesPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes Generales" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            {/* Contenido principal */}
                            <HeadingSmall title="Reportes" description="Acciones realizadas desde el principio del proyecto" />
                            {/* Ícono semitransparente */}
                            <ScrollText
                                size={70}
                                color="#22d3ee"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                    </div>
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {/* Separadors para ordenes */}
                    <div>
                        <div className="space-y-1">
                            <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
                            <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
                        </div>
                        <Separator className="col-span-full my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <Link href={route('reportes.productos_mas_comprados')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Productos Mas Comprados
                                    </Button>
                                </Link>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <Link href={route('reportes.compras_por_periodo')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Compras por Periodo
                                    </Button>
                                </Link>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <Link href={route('reportes.balance_gastos_mensuales')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Balance de Gastos Mensuales
                                    </Button>
                                </Link>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <Link href={route('reportes.compras_por_proveedor')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Compras por Proveedor
                                    </Button>
                                </Link>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <Link href={route('reportes.productos_por_almacen')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Productos por Almacen
                                    </Button>
                                </Link>
                            </div>
                            <Separator orientation="vertical" />
                        </div>
                        <br />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <Link href={route('reportes.productos_por_almacen_detalle')}>
                                    <Button variant="link" className="cursor-pointer">
                                        Detalles por Almacen
                                    </Button>
                                </Link>
                            </div>

                            <Separator orientation="vertical" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
