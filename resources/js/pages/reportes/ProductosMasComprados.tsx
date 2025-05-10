import HeadingSmall from '@/components/heading-small';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { ProductosMasCompradosList, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';

// Ruta de breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: route('reportes.index'),
    },
    {
        title: 'Productos más Comprados',
        href: route('reportes.productos_mas_comprados'),
    },
];

export default function ProductosMasCompradosPage({ productos }: { productos: ProductosMasCompradosList }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos Más Comprados" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <HeadingSmall title="Reportes" description="Listado de los Productos más comprados en el negocio." />
                        <ScrollText
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="col-span-full my-4" />
                </div>

                {/* Contenido Principal */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Top 10 Productos Más Comprados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {productos.length === 0 ? (
                                    <li className="py-4 text-center text-gray-500">No se encontraron registros.</li>
                                ) : (
                                    productos.map((producto, index) => (
                                        <li key={index} className="flex items-center justify-between border-b pb-2">
                                            <span className="font-medium">{producto.nombre_producto}</span>
                                            <div className="text-right">
                                                <div>
                                                    Total comprado: <strong>{producto.total_cantidad}</strong>
                                                </div>
                                                <div>
                                                    Veces comprado: <strong>{producto.veces_comprado}</strong>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
