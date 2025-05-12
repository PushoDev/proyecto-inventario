import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CompraPorProveedorRef, ProveedorProps } from '@/types';
import { Head } from '@inertiajs/react';
import { UserRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: route('reportes.index'),
    },
    {
        title: 'Compras por Proveedor',
        href: route('reportes.compras_por_proveedor'),
    },
];

export default function ComprasPorProveedorPage({ compras, proveedor }: { compras: CompraPorProveedorRef[]; proveedor: ProveedorProps | null }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Compras por Proveedor" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <h2 className="text-xl font-bold">Compras por Proveedor</h2>
                        <p className="text-sm text-gray-400">
                            Listado de compras realizadas al proveedor: <strong>{proveedor?.nombre_proveedor || 'Todos los proveedores'}</strong>
                        </p>
                        <UserRound
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="col-span-full my-4" />
                </div>

                {/* Tabla de Compras */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Historial de Compras</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Fecha</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Total</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Tipo de Compra</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {compras.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-4 text-center text-gray-500">
                                                    No se encontraron compras.
                                                </td>
                                            </tr>
                                        ) : (
                                            compras.map((compra) => (
                                                <tr key={compra.id}>
                                                    <td className="px-4 py-2 text-sm">{compra.id}</td>
                                                    <td className="px-4 py-2 text-sm">{compra.fecha_compra}</td>
                                                    <td className="px-4 py-2 text-sm">${parseFloat(compra.total_compra.toString()).toFixed(2)}</td>
                                                    <td className="px-4 py-2 text-sm capitalize">
                                                        {compra.tipo_compra === 'deuda_proveedor' ? 'Crédito' : 'Pago'}
                                                    </td>
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
