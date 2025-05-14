import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProductosProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBasket, TrendingUpIcon } from 'lucide-react';
import { columns } from './layouts/Columnas';
import { DataTableProductos } from './layouts/DataTableProductos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: route('productos.index'),
    },
];

export default function ProductosPage({ productos }: { productos: ProductosProps[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos - Glorieta.Shop" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <header>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            <HeadingSmall title="Productos Adquiridos" description="Gestión de los productos disponibles del negocio" />
                            <ShoppingBasket
                                size={70}
                                color="#f59e0b"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                        {/* Opciones */}
                        <div>
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger className="cursor-pointer">Opciones Generales</MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem disabled>Adquirir Nuevos Productos</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <Link href={route('comprar.index')}>Realizar Nueva Compra</Link>
                                        </MenubarItem>
                                        <MenubarItem disabled>Realizar venta de los Productos</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <Link href={route('comprar.index')}>Realizar Nueva Venta</Link>
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                                <MenubarMenu>
                                    <MenubarTrigger className="cursor-pointer">Importar Productos</MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem disabled>Archivos .xlsx - .csv</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem className="text-amber-800">Buscar Archivo</MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                                <MenubarMenu>
                                    <MenubarTrigger className="cursor-pointer">Exportar Productos</MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem disabled>Archivos .xlsx - .csv</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem className="text-emerald-800">Guardar Productos</MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </header>
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {/* Widget Productos */}
                    {/* Total de Productos */}
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Total de Productos</CardDescription>
                            <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">
                                {productos.length}
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
                    {/* Total de Importes */}
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Monto General</CardDescription>
                            <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">
                                Importe Gral
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
                    {/* Total de Others */}
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Monto General</CardDescription>
                            <CardTitle className="text-2xl font-semibold text-emerald-500 tabular-nums @[250px]/card:text-3xl">$ .00</CardTitle>
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

                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <DataTableProductos columns={columns} data={productos} />
                </div>
            </div>
        </AppLayout>
    );
}
