import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, GastoMensualRef } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarRange } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: route('reportes.index'),
    },
    {
        title: 'Balance de Gastos Mensuales',
        href: route('reportes.balance_gastos_mensuales'),
    },
];

export default function BalanceGastosMensualesPage({ gastos }: { gastos: GastoMensualRef[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Balance de Gastos Mensuales" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <h2 className="text-xl font-bold">Balance de Gastos Mensuales</h2>
                        <p className="text-sm text-gray-400">Total de compras realizadas por mes.</p>
                        <CalendarRange
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
                            <CardTitle>Gastos por Mes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Mes</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Total Comprado</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold">Número de Compras</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {gastos.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="py-4 text-center text-gray-500">
                                                    No se encontraron registros.
                                                </td>
                                            </tr>
                                        ) : (
                                            gastos.map((gasto, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 text-sm">{gasto.mes_anio}</td>
                                                    <td className="px-4 py-2 text-sm">${parseFloat(gasto.total.toString()).toFixed(2)}</td>
                                                    <td className="px-4 py-2 text-sm">{gasto.cantidad_compras}</td>
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
