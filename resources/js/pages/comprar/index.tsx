import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { AlmacenProps, CategoriasProps, CuentaNegocioProps, ProductoComprarProps, ProveedorProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { BookCheck, CalendarIcon, Edit2, PlusIcon, ShoppingBasket, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Caja Principal',
        href: '/dashboard',
    },
    {
        title: 'Productos',
        href: '/productos',
    },
    {
        title: 'Adquirir Nuevos Productos',
        href: '/comprar',
    },
];

export default function ComprarPage() {
    const { props } = usePage();
    const { errors } = props;
    const [almacens, setAlmacens] = useState<AlmacenProps[]>([]);
    const [proveedors, setProveedors] = useState<ProveedorProps[]>([]);
    const [categorias, setCategorias] = useState<CategoriasProps[]>([]);
    const [cuentas, setCuentas] = useState<CuentaNegocioProps[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    // Estado temporal para campos del producto
    const [tempFormData, setTempFormData] = useState<Omit<ProductoComprarProps, 'id'>>({
        producto: '',
        categoria: '',
        codigo: '',
        cantidad: 0,
        precio: 0,
    });

    // Estado para productos en la tabla
    const [productos, setProductos] = useState<ProductoComprarProps[]>([]);

    // Datos del formulario principal
    const { data, setData, post, processing } = useForm({
        compra: 'deuda_proveedor',
        cuenta_id: 1,
        almacen: '',
        proveedor: '',
        fecha: date ? date.toISOString().split('T')[0] : '',
    });

    // Cargar datos iniciales
    useEffect(() => {
        fetch('/compras/almacenes')
            .then((res) => res.json())
            .then((data) => setAlmacens(data))
            .catch((err) => console.error(err));

        fetch('/compras/proveedores')
            .then((res) => res.json())
            .then((data) => setProveedors(data))
            .catch((err) => console.error(err));

        fetch('/compras/categorias')
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((err) => console.error(err));

        fetch('/compras/cuentas')
            .then((res) => res.json())
            .then((data) => setCuentas(data))
            .catch((err) => console.error(err));
    }, []);

    // Manejar cambios en los campos temporales
    const handleTempInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTempFormData((prev) => ({
            ...prev,
            [name]: name === 'cantidad' || name === 'precio' ? parseFloat(value) || 0 : value,
        }));
    };

    // Agregar/Editar producto
    const agregarProducto = () => {
        if (!tempFormData.producto || !tempFormData.categoria || !tempFormData.codigo || tempFormData.cantidad <= 0 || tempFormData.precio <= 0) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const nuevoProducto: ProductoComprarProps = {
            id: editingProductId || Date.now(),
            ...tempFormData,
        };

        if (editingProductId) {
            setProductos((prev) => prev.map((p) => (p.id === editingProductId ? nuevoProducto : p)));
            setEditingProductId(null);
        } else {
            setProductos((prev) => [...prev, nuevoProducto]);
        }

        // Limpiar campos temporales
        setTempFormData({ producto: '', categoria: '', codigo: '', cantidad: 0, precio: 0 });
    };

    // Eliminar producto
    const eliminarProducto = (id: number) => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
    };

    // Editar producto
    const editarProducto = (id: number) => {
        const productoParaEditar = productos.find((p) => p.id === id);
        if (productoParaEditar) {
            setTempFormData({
                producto: productoParaEditar.producto,
                categoria: productoParaEditar.categoria,
                codigo: productoParaEditar.codigo,
                cantidad: productoParaEditar.cantidad,
                precio: productoParaEditar.precio,
            });
            setEditingProductId(id);
        }
    };

    // Calcular total de la compra
    const calcularTotal = () => {
        return productos.reduce((total, p) => total + p.cantidad * p.precio, 0).toFixed(2);
    };

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
                        className="absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform opacity-40"
                    />
                </div>
                <Separator className="col-span-4" />

                {/* Formulario principal */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sidebar-accent text-center">Nuevos Productos</CardTitle>
                        <CardDescription className="text-center">
                            A continuación usted va a realizar una compra de Productos, recuerde debe asignar: fecha de compra, almacén destino y
                            proveedor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => e.preventDefault()}>
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
                                    {errors.fecha && <InputError message={errors.fecha[0]} />}
                                </div>

                                {/* Proveedor */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="proveedor">Proveedor</Label>
                                    <Select name="proveedor" value={data.proveedor} onValueChange={(value) => setData('proveedor', value)}>
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
                                    {errors.proveedor && <InputError message={errors.proveedor[0]} />}
                                </div>

                                {/* Almacén Destino */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="almacen">Almacén</Label>
                                    <Select name="almacen" value={data.almacen} onValueChange={(value) => setData('almacen', value)}>
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
                                    {errors.almacen && <InputError message={errors.almacen[0]} />}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Formulario de productos */}
                <Card>
                    <CardHeader>
                        <CardDescription className="text-center dark:text-emerald-400">Ingrese Datos del Producto a Comprar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Nombre del Producto */}
                            <div className="grid w-full max-w-sm items-center gap-1">
                                <Label htmlFor="nombre_producto">Nombre del Producto</Label>
                                <Input
                                    className="mt-2"
                                    type="text"
                                    name="producto"
                                    placeholder="Producto"
                                    value={tempFormData.producto}
                                    onChange={handleTempInputChange}
                                />
                                {errors.producto && <InputError message={errors.producto[0]} />}
                            </div>

                            {/* Código del Producto */}
                            <div className="grid w-full max-w-sm items-center gap-1">
                                <Label htmlFor="codigo_producto">Código del Producto</Label>
                                <Input
                                    className="mt-2"
                                    type="text"
                                    name="codigo"
                                    placeholder="Código Producto"
                                    value={tempFormData.codigo}
                                    onChange={handleTempInputChange}
                                />
                                {errors.codigo && <InputError message={errors.codigo[0]} />}
                            </div>

                            {/* Categoría del Producto */}
                            <div className="grid w-full max-w-sm items-center gap-1">
                                <Label htmlFor="categorias">Categoría</Label>
                                <Select
                                    name="categoria"
                                    value={tempFormData.categoria}
                                    onValueChange={(value) => setTempFormData({ ...tempFormData, categoria: value })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione Categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categorias.map((categoria) => (
                                            <SelectItem key={categoria.id} value={categoria.nombre_categoria}>
                                                {categoria.nombre_categoria}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.categorias && <InputError message={errors.categorias[0]} />}
                            </div>

                            {/* Precio de Compra */}
                            <div className="grid w-full max-w-sm items-center gap-1">
                                <Label htmlFor="precio_producto">Precio</Label>
                                <Input
                                    type="number"
                                    name="precio"
                                    placeholder="Precio"
                                    value={tempFormData.precio}
                                    onChange={handleTempInputChange}
                                />
                                {errors.precio && <InputError message={errors.precio[0]} />}
                            </div>

                            {/* Cantidad de Productos */}
                            <div className="grid w-full max-w-sm items-center gap-1">
                                <Label htmlFor="cantidad_producto">Cantidad</Label>
                                <Input
                                    type="number"
                                    name="cantidad"
                                    placeholder="Cantidad"
                                    value={tempFormData.cantidad}
                                    onChange={handleTempInputChange}
                                />
                                {errors.cantidad && <InputError message={errors.cantidad[0]} />}
                            </div>

                            {/* Botón Agregar */}
                            <div className="mt-6 grid w-full max-w-sm items-center gap-1">
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer hover:animate-pulse hover:bg-blue-400"
                                    onClick={agregarProducto}
                                >
                                    <PlusIcon />
                                    Agregar Producto
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de productos */}
                <Table>
                    <TableCaption className="text-sidebar-accent">Lista de los Productos a Comprar.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead className="text-sidebar-accent text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.producto}</TableCell>
                                <TableCell>{p.categoria}</TableCell>
                                <TableCell>{p.codigo}</TableCell>
                                <TableCell>{p.cantidad}</TableCell>
                                <TableCell>${p.precio.toFixed(2)}</TableCell>
                                <TableCell>${(p.cantidad * p.precio).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" onClick={() => editarProducto(p.id)} className="text-blue-600 hover:text-blue-800">
                                        <Edit2 />
                                    </Button>
                                    <Button variant="link" onClick={() => eliminarProducto(p.id)} className="ms-2 text-red-600 hover:text-red-800">
                                        <Trash2Icon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className="font-bold">
                                Total de la Compra
                            </TableCell>
                            <TableCell className="bg-amber-300 text-amber-950">{productos.length} Productos</TableCell>
                            <TableCell className="bg-amber-800 text-amber-300">{productos.reduce((t, p) => t + p.cantidad, 0)} Unidades</TableCell>
                            <TableCell colSpan={2} className="bg-emerald-700 text-center text-xl font-bold text-emerald-950">
                                ${calcularTotal()}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                {/* Botones de acción */}
                <div className="flex justify-center p-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Realizar Compra</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tipo de Compra</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Antes de realizar la compra, seleccione si desea pagar ahora o comprar y pagar luego
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            {/* Opciones de Compra */}
                            <div>
                                {/* Tipo de Compra */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="tipo_compra">Tipo de Compra</Label>
                                    <Select
                                        name="compra"
                                        value={data.compra}
                                        onValueChange={(value) => setData('compra', value as 'deuda_proveedor' | 'pago_cash')}
                                    >
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Seleccione tipo de compra" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="deuda_proveedor">Deuda con Proveedor</SelectItem>
                                            <SelectItem value="pago_cash">Pago en Efectivo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.compra && <InputError message={errors.compra[0]} />}
                                </div>

                                {/* Cuenta */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="cuenta">Cuenta</Label>
                                    <Select
                                        name="cuenta_id"
                                        value={data.cuenta_id.toString()}
                                        onValueChange={(value) => setData('cuenta_id', parseInt(value))}
                                    >
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Seleccione Cuenta" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cuentas.map((cuenta) => (
                                                <SelectItem key={cuenta.id} value={cuenta.id.toString()}>
                                                    {cuenta.nombre_cuenta}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.cuenta_id && <InputError message={errors.cuenta_id[0]} />}
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        // Mapear productos al formato esperado por el backend
                                        setData('productos', productos);

                                        post('/comprar', {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                setProductos([]);
                                                setTempFormData({ producto: '', categoria: '', codigo: '', cantidad: 0, precio: 0 });
                                            },
                                        });
                                    }}
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? 'Registrando...' : 'Proceder Compra'}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard" className="ms-2">
                                    <Button variant="secondary">
                                        <BookCheck />
                                        Cancelar Compra
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cancelar y regresar</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </AppLayout>
    );
}
