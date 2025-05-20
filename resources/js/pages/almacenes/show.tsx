import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { AlmacenProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LucideWarehouse } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Almacenes',
        href: '/almacenes',
    },
    {
        title: 'Detalles del Almacen',
        href: '#',
    },
];

export default function ShowAlmacenesPage({ almacen }: { almacen: AlmacenProps }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contenido del Almacen " />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Almacenes" description="Tiendas o almacén para guardar los Productos" />

                        {/* Ícono semitransparente */}
                        <LucideWarehouse
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-0 transform animate-pulse opacity-40"
                        />
                    </div>
                </div>
                {/* Contendido show almacen */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">Información del Almacén</h2>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Nombre</dt>
                                <dd className="mt-1 text-sm">{almacen.nombre_almacen}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Teléfono</dt>
                                <dd className="mt-1 text-sm">{almacen.telefono_almacen}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Correo electrónico</dt>
                                <dd className="mt-1 text-sm">{almacen.correo_almacen || '-'}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Ubicación</dt>
                                <dd className="mt-1 text-sm">
                                    {almacen.ciudad_almacen && almacen.provincia_almacen
                                        ? `${almacen.ciudad_almacen}, ${almacen.provincia_almacen}`
                                        : '-'}
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-400">Notas Adicionales</dt>
                                <dd className="mt-1 text-sm whitespace-pre-wrap">{almacen.notas_almacen || 'Sin notas adicionales.'}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Creado el</dt>
                                <dd className="mt-1 text-sm">{new Date(almacen.created_at).toLocaleString()}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Última actualización</dt>
                                <dd className="mt-1 text-sm">{new Date(almacen.updated_at).toLocaleString()}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
