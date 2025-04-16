import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { AlmacenProps, CategoriasProps, ProveedorProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, ShoppingBasket } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adquirir Nuevos Productos',
        href: '/comprar',
    },
];

export default function ComprarPage() {
    // Estados para almacenar los datos
    const [almacens, setAlmacens] = useState<AlmacenProps[]>([]);
    const [proveedors, setProveedors] = useState<ProveedorProps[]>([]);
    const [categorias, setCategorias] = useState<CategoriasProps[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [formData, setFormData] = useState({
        almacen: '',
        proveedor: '',
        categorias: '',
    });

    // Cargar datos al inicializar el componente
    useEffect(() => {
        // Cargar almacenes
        fetch('/compras/almacenes')
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar almacenes');
                return response.json();
            })
            .then((data) => setAlmacens(data))
            .catch((error) => console.error(error));

        // Cargar proveedores
        fetch('/compras/proveedores')
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar proveedores');
                return response.json();
            })
            .then((data) => setProveedors(data))
            .catch((error) => console.error(error));

        // Cargar Categorias
        fetch('/compras/categorias')
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar las categorias');
                return response.json();
            })
            .then((data) => setCategorias(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comprar" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                    <HeadingSmall title="Productos Nuevos" description="Comprar o adquirir nuevos productos para el Negocio" />
                    <ShoppingBasket
                        size={70}
                        color="#f59e0b"
                        className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                    />
                </div>

                <Separator className="col-span-4" />

                {/* Formulario */}
                <div className="col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sidebar-accent text-center">Nuevos Productos</CardTitle>
                            <CardDescription className="text-center">
                                A continuación usted va a realizar una compra de Productos, recuerde debe asignar: fecha de compra, almacén destino y
                                proveedor.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action="">
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Fecha de la Compra */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="fechaCompra">Fecha de la Compra</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                                >
                                                    <CalendarIcon />
                                                    {date ? format(date, 'PPP') : <span>Seleccione Fecha</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="mt-2 w-auto p-0" align="start">
                                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Almacén Destino */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="almacenDestino">Almacén Destino</Label>
                                        <Select
                                            name="almacen"
                                            value={formData.almacen}
                                            onValueChange={(value) => setFormData({ ...formData, almacen: value })}
                                        >
                                            <SelectTrigger className="mt-2 w-full">
                                                <SelectValue placeholder="Seleccione Almacén" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {almacens.map((almacen) => (
                                                    <SelectItem key={almacen.id} value={almacen.nombre_almacen}>
                                                        {almacen.nombre_almacen}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Proveedor */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="proveedor">Proveedor</Label>
                                        <Select
                                            name="proveedor"
                                            value={formData.proveedor}
                                            onValueChange={(value) => setFormData({ ...formData, proveedor: value })}
                                        >
                                            <SelectTrigger className="mt-2 w-full">
                                                <SelectValue placeholder="Seleccione Proveedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {proveedors.map((proveedor) => (
                                                    <SelectItem key={proveedor.id} value={proveedor.nombre_proveedor}>
                                                        {proveedor.nombre_proveedor}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mt-2">
                        <Card>
                            <CardHeader>
                                <CardDescription className="text-center dark:text-emerald-400">Ingrese Datos del Producto a Comprar</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-4">
                                    {/* Nombre del Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="nombre_producto">Nombre del Producto</Label>
                                        <Input className="mt-2" />
                                        <InputError />
                                    </div>
                                    {/* Categoria del Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="nombre_producto">Categoria del Producto</Label>
                                        <Select
                                            name="categorias"
                                            value={formData.categorias}
                                            onValueChange={(value) => setFormData({ ...formData, categorias: value })}
                                        >
                                            <SelectTrigger className="mt-2 w-full">
                                                <SelectValue placeholder="Seleccione Categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categorias.map((categoria) => (
                                                    <SelectItem key={categoria.id} value={categoria.nombre_categoria}>
                                                        {categoria.nombre_categoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError />
                                    </div>
                                    {/* Precio de Compra */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="precio_producto">Precio del Producto</Label>
                                        <Input className="mt-2" type="number" />
                                        <InputError />
                                    </div>
                                    {/* Cantidad de Productos */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="cantidad_producto">Cantidad Comprada</Label>
                                        <Input className="mt-2" type="number" />
                                        <InputError />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Separator className="mt-3" />
                    <Table></Table>
                </div>
            </div>
        </AppLayout>
    );
}
