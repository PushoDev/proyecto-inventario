import HeadingSmall from '@/components/heading-small';
import { Separator } from '@/components/ui/separator';
import { Table, TableCaption, TableHead, TableHeader } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PackageOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];

export default function ProductosPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos en la Glorieta.Shop" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Productos Adquiridos" description="Gestión de los productos disponibles del negocio" />
                        {/* Ícono semitransparente */}
                        <PackageOpen
                            size={70}
                            color="#f59e0b"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator />
                </div>

                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <Table>
                        <TableCaption>Productos Disponibles en el Negocio</TableCaption>
                        <TableHeader className="bg-sidebar rounded-2xl">
                            <TableHead>Producto</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Precio Invertido</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Imagen</TableHead>
                            <TableHead className="text-right text-blue-600 dark:text-amber-600">Opciones</TableHead>
                        </TableHeader>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
