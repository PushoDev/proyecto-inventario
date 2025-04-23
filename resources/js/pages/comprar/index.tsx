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
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { AlmacenProps, CategoriasProps, ProductoComprarProps, ProveedorProps, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { BookCheck, CalendarIcon, Edit2, PlusIcon, ShoppingBasket, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Caja Principal',
        href: '/',
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
    // Estados para almacenar los datos
    const [almacens, setAlmacens] = useState<AlmacenProps[]>([]);
    const [proveedors, setProveedors] = useState<ProveedorProps[]>([]);
    const [categorias, setCategorias] = useState<CategoriasProps[]>([]);
    // Estado para el producto en la tabla
    const [producto, setProductos] = useState<ProductoComprarProps[]>([]);
    // Calendario select
    const [date, setDate] = useState<Date | undefined>(undefined);
    // Estados para el formulario
    const [formData, setFormData] = useState({
        almacen: '',
        proveedor: '',
        producto: '',
        categorias: '',
        codigo: '',
        cantidad: 0,
        precio: 0,
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

    // Manejar cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Agregar un producto a la tabla
    const agregarProducto = () => {
        if (
            formData.producto.trim() === '' ||
            formData.categorias.trim() === '' ||
            formData.codigo.trim() === '' ||
            formData.cantidad <= 0 ||
            formData.precio <= 0
        ) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const nuevoProducto: ProductoComprarProps = {
            id: editingProductId || Date.now(), // Usar el ID existente o generar uno nuevo
            producto: formData.producto,
            categoria: formData.categorias,
            codigo: formData.codigo,
            cantidad: formData.cantidad,
            precio: formData.precio,
        };

        if (editingProductId) {
            // Actualizar el producto existente
            setProductos((prevProductos) => prevProductos.map((p) => (p.id === editingProductId ? nuevoProducto : p)));
            setEditingProductId(null); // Limpiar el estado de edición
        } else {
            // Agregar un nuevo producto
            setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
        }

        limpiarForm();
    };

    // Eliminar un producto de la tabla
    const eliminarProducto = (id: number) => {
        setProductos((prevProductos) => prevProductos.filter((p) => p.id !== id));
    };

    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    // Editar un producto existente
    const editarProducto = (id: number) => {
        const productoParaEditar = producto.find((p) => p.id === id);
        if (productoParaEditar) {
            setFormData({
                almacen: '', // Estos campos no se usan en la edición
                proveedor: '', // Estos campos no se usan en la edición
                producto: productoParaEditar.producto,
                categorias: productoParaEditar.categoria,
                codigo: productoParaEditar.codigo,
                cantidad: productoParaEditar.cantidad,
                precio: productoParaEditar.precio,
            });
            setEditingProductId(id); // Establecer el ID del producto en edición
        }
    };

    // Limpiar Formulario
    const limpiarForm = () => {
        setFormData({
            almacen: '',
            proveedor: '',
            producto: '',
            categorias: '',
            codigo: '',
            cantidad: 0,
            precio: 0,
        });
        setEditingProductId(null);
    };

    // Proceder Compra
    const procederCompra = async () => {
        try {
            // Obtener el token CSRF
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (!csrfToken) {
                throw new Error('CSRF token no encontrado');
            }

            // Validar la fecha
            if (!date) {
                alert('Por favor, selecciona una fecha.');
                return;
            }

            const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

            // Realizar la solicitud POST
            const response = await fetch('/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    almacen: formData.almacen,
                    proveedor: formData.proveedor,
                    fecha: formattedDate,
                    productos: producto, // Array de productos
                }),
            });

            if (!response.ok) throw new Error('Error al registrar la compra');

            const data = await response.json();
            console.log(data); // Manejar la respuesta
            alert('Compra registrada correctamente');
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al registrar la compra');
        }
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
                            {/* Formulario */}
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
                            {/* Form Config Destino End */}
                        </CardContent>
                    </Card>
                    <div className="mt-2">
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
                                            value={formData.producto}
                                            onChange={handleInputChange}
                                        />
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
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione Categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categorias.map((categoria: CategoriasProps) => (
                                                    <SelectItem key={categoria.id} value={categoria.nombre_categoria}>
                                                        {categoria.nombre_categoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError />
                                    </div>
                                    {/* Codigo de Compra */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="codigo_producto">Código del Producto</Label>
                                        <Input
                                            className="mt-2"
                                            type="text"
                                            name="codigo"
                                            placeholder="Código Producto"
                                            value={formData.codigo}
                                            onChange={handleInputChange}
                                        />
                                        <InputError />
                                    </div>
                                    {/* Precio de Compra */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="precio_producto">Precio del Producto</Label>
                                        <Input
                                            type="number"
                                            name="precio"
                                            placeholder="Precio de compra del producto"
                                            value={formData.precio}
                                            onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value || '0') })}
                                        />
                                        <InputError />
                                    </div>
                                    {/* Cantidad de Productos */}
                                    <div className="grid w-full max-w-sm items-center gap-1">
                                        <Label htmlFor="cantidad_producto">Cantidad Comprada</Label>
                                        <Input
                                            type="number"
                                            name="cantidad"
                                            placeholder="Cantidad de los productos"
                                            value={formData.cantidad}
                                            onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value || '0', 10) })}
                                        />
                                        <InputError />
                                    </div>
                                    {/* Btn Agregar */}
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
                    </div>
                    <Separator className="mt-3" />
                    <Table>
                        <TableCaption className="text-sidebar-accent">Lista de los Productos a Comprar.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead className="text-sidebar-accent text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {producto.map((producto) => (
                                <TableRow key={producto.id}>
                                    <TableCell className="font-medium">{producto.producto}</TableCell>
                                    <TableCell>{producto.categoria}</TableCell>
                                    <TableCell>{producto.codigo}</TableCell>
                                    <TableCell>{producto.cantidad}</TableCell>
                                    <TableCell>{producto.precio}</TableCell>
                                    <TableCell className="text-right">
                                        {/* Btn Acciones */}
                                        <Button
                                            variant="link"
                                            onClick={() => editarProducto(producto.id)}
                                            className="cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white"
                                        >
                                            <Edit2 />
                                        </Button>
                                        <Button
                                            variant="link"
                                            onClick={() => eliminarProducto(producto.id)}
                                            className="hover:bg-destructive text-destructive ms-2 cursor-pointer hover:text-white"
                                        >
                                            <Trash2Icon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total de la Compra</TableCell>
                                <TableCell className="bg-amber-300 text-amber-950">{producto.length} Productos</TableCell>
                                <TableCell className="bg-amber-800 text-amber-300">
                                    {producto.reduce((total, item) => total + item.cantidad, 0)} Unidades
                                </TableCell>
                                <TableCell className="bg-emerald-700 text-emerald-950">
                                    $ {producto.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-sidebar-accent text-right">Acciones</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
                <Separator />
                <div className="flex justify-center p-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    className="cursor-pointer bg-emerald-400 text-emerald-950 hover:bg-emerald-900 hover:text-white"
                                    onClick={procederCompra}
                                >
                                    <BookCheck />
                                    Proceder a la Compra
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Continuar con la Compra de los Productos</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href="/dashboard">
                                    <Button
                                        onClick={limpiarForm}
                                        className="ms-2 cursor-pointer bg-red-400 text-red-950 hover:bg-red-900 hover:text-white"
                                    >
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
