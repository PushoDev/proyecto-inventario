import HeadingSmall from '@/components/heading-small';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { CuentaNegocioProps, DeudasProveedoresProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BookCheck, HandCoins, Pencil, Trash2 } from 'lucide-react';

// Tipado para las props recibidas desde el controlador
interface CuentasProps {
    cuentas: CuentaNegocioProps[];
    deudasProveedores: DeudasProveedoresProps[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistica General',
        href: '/logistica',
    },
    {
        title: 'Cuentas',
        href: '/cuentas',
    },
];

export default function Cuentas({ cuentas, deudasProveedores }: CuentasProps) {
    // Calcular totales
    const totalCuentas = cuentas.reduce((total, cuenta) => total + (cuenta.saldo_cuenta || 0), 0);
    const totalDeudas = deudasProveedores
        .filter((deuda) => deuda.estado === 'pendiente') // Solo sumar deudas pendientes
        .reduce((total, deuda) => total + deuda.monto_deuda, 0);

    // Función para eliminar una cuenta
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
            router.delete(route('cuentas.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cuentas Monetarias" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <header>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            <HeadingSmall
                                title="Cuentas Monetarias"
                                description="Gestión de Cuentas fiscales, monetarias y deudas pendientes a Proveedores"
                            />
                            <HandCoins
                                size={70}
                                color="green"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={route('cuentas.create')}>
                                                <Button className="cursor-pointer bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">
                                                    <BookCheck />
                                                    Agregar Cuenta
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Agregar Categorías</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="text-emerald-600">Cuentas Monetarias: {cuentas.length} </div>
                            <Separator orientation="vertical" />
                            <div className="text-red-500">Deudas: {deudasProveedores.length} </div>
                        </div>
                    </header>
                </div>

                {/* Tabla de Cuentas */}
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="mt-4 rounded-xl border-2 border-emerald-600">
                        <Table className="mt-4">
                            <TableCaption className="rounded-2xl bg-emerald-800 text-white">Cuentas del Negocio</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NOMBRE DE CUENTA</TableHead>
                                    <TableHead>MONTO</TableHead>
                                    <TableHead>TIPO DE CUENTA</TableHead>
                                    <TableHead>NOTAS</TableHead>
                                    <TableHead>ACCIONES</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cuentas.map((cuenta) => (
                                    <TableRow key={cuenta.id}>
                                        <TableCell className="bg-emerald-600">{cuenta.nombre_cuenta}</TableCell>
                                        <TableCell className="bg-emerald-900 text-center">${cuenta.saldo_cuenta?.toFixed(2) || '0.00'}</TableCell>
                                        <TableCell>{cuenta.tipo_cuenta}</TableCell>
                                        <TableCell>{cuenta.notas_cuenta || 'Sin notas'}</TableCell>
                                        <TableCell className="flex justify-around text-center">
                                            {/* Botón Editar */}
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link href={route('cuentas.edit', cuenta.id)}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="bg-yellow-500 text-black hover:bg-yellow-600"
                                                            >
                                                                <Pencil size={16} />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Editar Cuenta</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            {/* Botón Eliminar */}
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="bg-red-500 text-white hover:bg-red-600"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta acción no se puede deshacer. ¿Deseas eliminar esta cuenta?
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(cuenta.id)}>
                                                                        Eliminar
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Eliminar Cuenta</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TOTAL FINANCIERO</TableCell>
                                    <TableCell className="cursor-none bg-emerald-950 text-center">${totalCuentas.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <Separator className="mt-2" />

                    {/* Tabla de Deudas a Proveedores */}
                    <div className="mt-4 rounded-xl border-1 border-red-900">
                        <Table className="mt-4">
                            <TableCaption className="bg-destructive rounded-2xl text-white">Montos Pendientes a Pagar</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">PROVEEDOR</TableHead>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">MONTO</TableHead>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">FECHA GENERACIÓN</TableHead>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">ESTADO</TableHead>
                                    <TableHead className="bg-red-950 text-center font-bold text-white">DETALLES</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deudasProveedores
                                    .filter((deuda) => deuda.estado === 'pendiente') // Filtrar solo deudas pendientes
                                    .map((deuda) => (
                                        <TableRow key={deuda.id}>
                                            <TableCell className="bg-red-700 font-bold text-white">
                                                {deuda.proveedor_id} {/* Aquí deberías usar el nombre del proveedor si está disponible */}
                                            </TableCell>
                                            <TableCell className="bg-red-800 text-center text-white">${deuda.monto_deuda.toFixed(2)}</TableCell>
                                            <TableCell className="bg-red-800 text-center text-white">
                                                {new Date(deuda.fecha_generacion).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="bg-red-800 text-center text-white">
                                                {deuda.estado.charAt(0).toUpperCase() + deuda.estado.slice(1)}
                                            </TableCell>
                                            <TableCell className="bg-red-800 text-center text-white">
                                                <button className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">Ver Detalles</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>TOTALES</TableCell>
                                    <TableCell className="bg-destructive cursor-none text-center">${totalDeudas.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
