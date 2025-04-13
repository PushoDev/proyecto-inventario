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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlmacenProps, Categoria, Proveedor } from '@/types';
import { Edit2, LucideBaggageClaim, ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const WidgetCompra = () => {
    const [almacens, setAlmacens] = useState<AlmacenProps[]>([]);
    const [proveedors, setProveedors] = useState<Proveedor[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Estado para los productos en la tabla
    const [productos, setProductos] = useState<
        { id: number; producto: string; cantidad: number; categoria: string; almacen: string; codigo: string; proveedor: string; precio: number }[]
    >([]);

    // Estado para el formulario
    const [formData, setFormData] = useState({
        producto: '',
        cantidad: 0,
        categoria: '',
        almacen: '',
        codigo: '',
        proveedor: '',
        precio: 0,
    });

    useEffect(() => {
        // Cargar almacenes
        fetch('/compras/almacenes')
            .then((response) => response.json())
            .then((data) => setAlmacens(data));
        // Cargar proveedores
        fetch('/compras/proveedores')
            .then((response) => response.json())
            .then((data) => setProveedors(data));
        // Cargar categorías
        fetch('/compras/categorias')
            .then((response) => response.json())
            .then((data) => setCategorias(data));
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
    const addProducto = () => {
        if (
            formData.producto.trim() === '' ||
            formData.cantidad <= 0 ||
            formData.categoria.trim() === '' ||
            formData.almacen.trim() === '' ||
            formData.codigo.trim() === '' ||
            formData.proveedor.trim() === '' ||
            formData.precio <= 0
        ) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const nuevoProducto = {
            id: Date.now(),
            ...formData,
        };

        setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
        clearForm();
    };

    // Editar un producto existente
    const editProducto = (id: number) => {
        const productoToEdit = productos.find((p) => p.id === id);
        if (productoToEdit) {
            setFormData(productoToEdit);
            deleteProducto(id); // Elimina el producto original antes de editar
        }
    };

    // Eliminar un producto de la tabla
    const deleteProducto = (id: number) => {
        setProductos((prevProductos) => prevProductos.filter((p) => p.id !== id));
    };

    // Limpiar el formulario
    const clearForm = () => {
        setFormData({
            producto: '',
            cantidad: 0,
            categoria: '',
            almacen: '',
            codigo: '',
            proveedor: '',
            precio: 0,
        });
    };

    return (
        <>
            <div>
                {/* Widget */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-red-800 to-red-400">
                    {/* Ícono de fondo transparente */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <ShoppingBagIcon className="h-48 w-48 text-white" />
                    </div>
                    {/* Contenido principal */}
                    <div className="relative z-10 h-full p-6">
                        {/* Ícono en la esquina superior izquierda */}
                        <div className="absolute top-4 left-4">
                            <LucideBaggageClaim className="h-8 w-8 text-white" />
                        </div>
                        {/* Textos alineados a la derecha */}
                        <div className="flex h-full flex-col items-end justify-center space-y-2">
                            <h3 className="font-sans text-4xl font-bold text-white">Compra</h3>
                            <span className="text-lg text-white">Adquirir Nuevos Productos</span>
                        </div>
                        {/* Botón pequeño - dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="absolute right-4 bottom-4 rounded-md bg-red-800 px-4 py-1 text-sm font-semibold text-white shadow-md transition duration-300 hover:animate-pulse hover:cursor-pointer hover:bg-white hover:text-red-800">
                                    Comprar
                                </button>
                            </AlertDialogTrigger>
                            {/* Contenido del dialogo o modal */}
                            <AlertDialogContent className="max-h-[900px] overflow-y-auto sm:max-w-[1024px]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-sidebar-accent text-center">Nuevos Productos</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center">
                                        Completa los detalles para registrar una nueva compra.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <hr />
                                {/* Formulario */}
                                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                                    {/* Almacenes */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="almacenDestino">Almacén Destino</Label>
                                        <Select
                                            name="almacen"
                                            value={formData.almacen}
                                            onValueChange={(value) => setFormData({ ...formData, almacen: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione Almacén" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {almacens.map((almacen: AlmacenProps) => (
                                                    <SelectItem key={almacen.id} value={almacen.name}>
                                                        {almacen.name}
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
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione Proveedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {proveedors.map((proveedor: Proveedor) => (
                                                    <SelectItem key={proveedor.id} value={proveedor.name_proveedor}>
                                                        {proveedor.name_proveedor}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* Categorias */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="categoria">Categoría</Label>
                                        <Select
                                            name="categoria"
                                            value={formData.categoria}
                                            onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione Categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categorias.map((categoria: Categoria) => (
                                                    <SelectItem key={categoria.id} value={categoria.name_categoria}>
                                                        {categoria.name_categoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* Nombre Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="name_producto">Nombre del Producto</Label>
                                        <Input
                                            type="text"
                                            name="producto"
                                            placeholder="Producto"
                                            value={formData.producto}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {/* Código Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="code_producto">Código del Producto</Label>
                                        <Input
                                            type="text"
                                            name="codigo"
                                            placeholder="Code Producto"
                                            value={formData.codigo}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {/* Precio Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="precio_producto">Precio del Producto</Label>
                                        <Input
                                            type="number"
                                            name="precio"
                                            placeholder="Precio de compra del producto"
                                            value={formData.precio}
                                            onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value || '0') })}
                                        />
                                    </div>
                                    {/* Cantidad Producto */}
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="cantidad_producto">Cantidad Comprada</Label>
                                        <Input
                                            type="number"
                                            name="cantidad"
                                            placeholder="Cantidad de los productos"
                                            value={formData.cantidad}
                                            onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value || '0', 10) })}
                                        />
                                    </div>
                                </div>
                                {/* Btn Agregar a la tabla */}
                                <Button variant="default" className="cursor-pointer bg-blue-300 text-white hover:bg-blue-700" onClick={addProducto}>
                                    Agregar
                                </Button>
                                <hr />
                                {/* Listado de la Compra */}
                                <Table>
                                    <TableCaption>Lista de los Productos Adquiridos (Ahora).</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Producto</TableHead>
                                            <TableHead>Cantidad</TableHead>
                                            <TableHead>Categoria</TableHead>
                                            <TableHead>Almacen</TableHead>
                                            <TableHead>Código</TableHead>
                                            <TableHead>Proveedor</TableHead>
                                            <TableHead>Precio</TableHead>
                                            <TableHead className="text-sidebar-accent text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productos.map((producto) => (
                                            <TableRow key={producto.id}>
                                                <TableCell className="font-medium">{producto.producto}</TableCell>
                                                <TableCell>{producto.cantidad}</TableCell>
                                                <TableCell>{producto.categoria}</TableCell>
                                                <TableCell>{producto.almacen}</TableCell>
                                                <TableCell>{producto.codigo}</TableCell>
                                                <TableCell>{producto.proveedor}</TableCell>
                                                <TableCell>{producto.precio}</TableCell>
                                                <TableCell className="text-right">
                                                    {/* Btn Acciones */}
                                                    <Button
                                                        variant="ghost"
                                                        className="cursor-pointer bg-blue-300 text-blue-950 hover:bg-blue-600 hover:text-white"
                                                        onClick={() => editProducto(producto.id)}
                                                    >
                                                        <Edit2 />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="hover:bg-destructive cursor-pointer bg-red-300 text-red-950 hover:text-white"
                                                        onClick={() => deleteProducto(producto.id)}
                                                    >
                                                        <Trash2Icon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={6}>Total de la Compra</TableCell>
                                            <TableCell className="bg-emerald-700 text-center text-emerald-950">
                                                ${productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <hr />
                                {/* Botones de Opciones */}
                                <AlertDialogFooter className="text-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="cursor-pointer bg-emerald-600 hover:bg-emerald-800">
                                                Proceder
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-sidebar-accent text-center">Proceder Compra</DialogTitle>
                                                <DialogDescription>
                                                    Antes de continuar, usted va a pagar los productos o desea continuar. Si continua esta compra se
                                                    guarda como deuda pendiente al proveedor
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4 text-center">
                                                <div className="flex items-center space-x-2">
                                                    <Switch className="cursor-pointer" />
                                                    <Label>Pagar Ahora</Label>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="secondary" type="submit" className="cursor-pointer text-center hover:bg-blue-400">
                                                    Continuar con la Compra
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    {/* Cancelar Compra */}
                                    <AlertDialogCancel className="hover:bg-destructive cursor-pointer">Cancelar</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    {/* Patrón de fondo adicional */}
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
};

export default WidgetCompra;
