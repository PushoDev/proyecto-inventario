import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CategoriasProps, ProductosProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { PackageOpen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/productos' },
    { title: 'Editar Producto', href: '#' },
];

export default function EditProductoPage({ producto, categorias }: { producto: ProductosProps; categorias: CategoriasProps[] }) {
    const { data, put, processing, errors, setData } = useForm({
        nombre_producto: producto.nombre_producto,
        marca_producto: producto.marca_producto || '',
        codigo_producto: producto.codigo_producto || '',
        categoria_id: '', // Inicializamos como cadena vacía
        precio_compra_producto: producto.precio_compra_producto.toString(),
        cantidad_producto: producto.cantidad_producto.toString(),
        imagen_producto: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(producto.imagen_url || null);

    // Manejar la selección de una nueva imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagen_producto', file); // Actualizar el estado del formulario
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('productos.update', { producto: producto.id }), {
            onSuccess: () => {
                toast.success('Producto actualizado correctamente');
            },
            onError: () => {
                toast.error('Error al actualizar el producto');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Producto" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Editar Producto" description="Actualiza los detalles del producto" />
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre del Producto */}
                        <div>
                            <Label htmlFor="nombre_producto">Nombre del Producto</Label>
                            <Input
                                id="nombre_producto"
                                name="nombre_producto"
                                value={data.nombre_producto}
                                onChange={(e) => setData('nombre_producto', e.target.value)}
                                required
                                className="mt-1"
                            />
                            {errors.nombre_producto && <p className="text-red-500">{errors.nombre_producto}</p>}
                        </div>

                        {/* Marca del Producto */}
                        <div>
                            <Label htmlFor="marca_producto">Marca del Producto</Label>
                            <Input
                                id="marca_producto"
                                name="marca_producto"
                                value={data.marca_producto}
                                onChange={(e) => setData('marca_producto', e.target.value)}
                                className="mt-1"
                            />
                            {errors.marca_producto && <p className="text-red-500">{errors.marca_producto}</p>}
                        </div>

                        {/* Código del Producto */}
                        <div>
                            <Label htmlFor="codigo_producto">Código del Producto</Label>
                            <Input
                                id="codigo_producto"
                                name="codigo_producto"
                                value={data.codigo_producto}
                                onChange={(e) => setData('codigo_producto', e.target.value)}
                                className="mt-1"
                            />
                            {errors.codigo_producto && <p className="text-red-500">{errors.codigo_producto}</p>}
                        </div>

                        {/* Categoría del Producto */}
                        <div>
                            <Label htmlFor="categoria_id">Categoría</Label>
                            <Select
                                name="categoria_id"
                                value={data.categoria_id}
                                onValueChange={(value) => setData('categoria_id', value)} // Actualizar el estado del formulario
                                required
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categorias.map((categoria) => (
                                        <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                            {categoria.nombre_categoria}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categoria_id && <p className="text-red-500">{errors.categoria_id}</p>}
                        </div>

                        {/* Precio de Compra */}
                        <div>
                            <Label htmlFor="precio_compra_producto">Precio de Compra</Label>
                            <Input
                                id="precio_compra_producto"
                                name="precio_compra_producto"
                                type="number"
                                step="0.01"
                                value={data.precio_compra_producto}
                                onChange={(e) => setData('precio_compra_producto', e.target.value)}
                                required
                                className="mt-1"
                            />
                            {errors.precio_compra_producto && <p className="text-red-500">{errors.precio_compra_producto}</p>}
                        </div>

                        {/* Cantidad del Producto */}
                        <div>
                            <Label htmlFor="cantidad_producto">Cantidad</Label>
                            <Input
                                id="cantidad_producto"
                                name="cantidad_producto"
                                type="number"
                                value={data.cantidad_producto}
                                onChange={(e) => setData('cantidad_producto', e.target.value)}
                                required
                                className="mt-1"
                            />
                            {errors.cantidad_producto && <p className="text-red-500">{errors.cantidad_producto}</p>}
                        </div>

                        {/* Imagen del Producto */}
                        <div>
                            <Label htmlFor="imagen_producto">Imagen del Producto</Label>
                            <Input
                                id="imagen_producto"
                                name="imagen_producto"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1"
                            />
                            {errors.imagen_producto && <p className="text-red-500">{errors.imagen_producto}</p>}
                            {previewImage && (
                                <div className="mt-2">
                                    <img src={previewImage} alt="Vista previa" className="h-32 w-auto rounded-md" />
                                </div>
                            )}
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-2">
                            <Link href={route('productos.index')}>
                                <Button variant="outline" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                                Guardar Cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
