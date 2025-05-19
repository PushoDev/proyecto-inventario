import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProductoPorAlmacenDetalleRef } from '@/types';
import { Head } from '@inertiajs/react';
import { Warehouse } from 'lucide-react';
// Acordeon
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: route('reportes.index'),
    },
    {
        title: 'Productos por Almacén (Detallado)',
        href: route('reportes.productos_por_almacen_detalle'),
    },
];

export default function ProductosPorAlmacenDetallePage({ datos }: { datos: ProductoPorAlmacenDetalleRef[] }) {
    // Agrupamos los datos por almacén para mostrarlos separados
    const almacenes = datos.reduce(
        (acc, item) => {
            if (!acc[item.almacen_id]) {
                acc[item.almacen_id] = {
                    nombre_almacen: item.nombre_almacen,
                    productos: [],
                };
            }
            acc[item.almacen_id].productos.push({
                id: item.producto_id,
                nombre: item.nombre_producto,
                cantidad: item.cantidad_total,
            });
            return acc;
        },
        {} as Record<number, { nombre_almacen: string; productos: { id: number; nombre: string; cantidad: number }[] }>,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos por Almacén - Detallado" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        <h2 className="text-xl font-bold">Productos por Almacén (Detallado)</h2>
                        <p className="text-sm text-gray-400">Listado detallado de productos almacenados.</p>
                        <Warehouse
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator className="col-span-full my-4" />
                </div>

                {/* Contenido */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6"></div>

                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    {Object.keys(almacenes).length === 0 ? (
                        <div className="py-4 text-center text-gray-500">No se encontraron registros.</div>
                    ) : (
                        Object.values(almacenes).map((almacen, index) => (
                            <Accordion key={index} type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>{almacen.nombre_almacen}</AccordionTrigger>
                                    <AccordionContent>
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-semibold">Producto</th>
                                                    <th className="px-4 py-2 text-left text-sm font-semibold">Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {almacen.productos.map((producto) => (
                                                    <tr key={producto.id}>
                                                        <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                                                        <td className="px-4 py-2 text-sm">{producto.cantidad}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
