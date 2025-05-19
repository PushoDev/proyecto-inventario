import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProductoPorAlmacenRef } from '@/types';
import { Head } from '@inertiajs/react';
import { Warehouse } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: route('reportes.index'),
    },
    {
        title: 'Productos por Almacén',
        href: route('reportes.productos_por_almacen'),
    },
];

export default function ProductosPorAlmacenPage({ almacenes }: { almacenes: ProductoPorAlmacenRef[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos por Almacén" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <h2 className="text-xl font-bold">Productos por Almacén</h2>
                        <p className="text-sm text-gray-400">Cantidad total de productos almacenados en cada almacén.</p>
                        <Warehouse
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="col-span-full my-4" />
                </div>

                {/* Tabla de Almacenes */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Inventario por Almacén</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Almacén</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Total de Unidades</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Productos Únicos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {almacenes.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="py-4 text-center text-gray-500">
                                                    No se encontraron registros.
                                                </td>
                                            </tr>
                                        ) : (
                                            almacenes.map((almacen) => (
                                                <tr key={almacen.almacen_id}>
                                                    <td className="px-4 py-2 text-sm">{almacen.nombre_almacen}</td>
                                                    <td className="px-4 py-2 text-sm">{almacen.total_productos}</td>
                                                    <td className="px-4 py-2 text-sm">{almacen.productos_unicos}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
