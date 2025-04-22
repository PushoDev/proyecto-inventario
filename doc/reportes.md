Entendido. Ahora que has proporcionado el contexto correcto y especificado que el reporte debe integrarse dentro de React con TypeScript, voy a adaptar la solución para que funcione en tu estructura actual sin usar Blade.

Vamos a crear un componente React para mostrar el reporte de la compra. Este componente recibirá los datos de la compra desde el backend a través de una solicitud HTTP y los mostrará en una tabla.

---

### **Solución: Reporte de Compra en React**

#### 1. **Backend: Controlador para generar el reporte**

Primero, asegurémonos de que el backend tenga un endpoint para obtener los detalles de una compra específica. Esto ya lo definimos previamente en el controlador `CompraController`. Aquí está el método relevante:

```php
public function reporte($id)
{
    $compra = Compra::with('detalles.producto')->findOrFail($id);

    return response()->json($compra);
}
```

Este método devuelve los detalles de la compra, incluidos los productos comprados, en formato JSON.

---

#### 2. **Frontend: Componente de Reporte**

Ahora crearemos un componente React para mostrar el reporte de la compra. Este componente se integrará en la página principal de reportes que proporcionaste.

##### Archivo: `ReporteCompra.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface Compra {
    id: number;
    fecha_compra: string;
    total_compra: number;
    almacen: { nombre_almacen: string };
    proveedor: { nombre_proveedor: string };
    detalles: Array<{
        producto: { nombre_producto: string };
        cantidad: number;
        precio_unitario: number;
        subtotal: number;
    }>;
}

export default function ReporteCompra({ compraId }: { compraId: number }) {
    const [compra, setCompra] = useState<Compra | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/compras/reporte/${compraId}`)
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar el reporte');
                return response.json();
            })
            .then((data) => {
                setCompra(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [compraId]);

    if (loading) {
        return <div>Cargando reporte...</div>;
    }

    if (!compra) {
        return <div>No se encontró la compra.</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reporte de Compra</CardTitle>
                <CardDescription>Detalles de la compra realizada.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <p><strong>Fecha:</strong> {format(new Date(compra.fecha_compra), 'dd/MM/yyyy')}</p>
                    <p><strong>Almacén:</strong> {compra.almacen.nombre_almacen}</p>
                    <p><strong>Proveedor:</strong> {compra.proveedor.nombre_proveedor}</p>
                    <p><strong>Total:</strong> ${compra.total_compra.toFixed(2)}</p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Precio Unitario</TableHead>
                            <TableHead>Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {compra.detalles.map((detalle, index) => (
                            <TableRow key={index}>
                                <TableCell>{detalle.producto.nombre_producto}</TableCell>
                                <TableCell>{detalle.cantidad}</TableCell>
                                <TableCell>${detalle.precio_unitario.toFixed(2)}</TableCell>
                                <TableCell>${detalle.subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
```

---

#### 3. **Integración en la Página de Reportes**

Ahora integraremos el componente `ReporteCompra` en tu página de reportes (`RepostesPage.tsx`). Asegúrate de pasar el ID de la compra como parámetro.

##### Archivo: `RepostesPage.tsx`

```tsx
import HeadingSmall from '@/components/heading-small';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';
import ReporteCompra from './ReporteCompra'; // Importa el componente de reporte

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '/reportes',
    },
];

export default function ReposrtesPage() {
    // Ejemplo: ID de la compra que deseas mostrar
    const compraId = 1;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movimientos Internos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                        {/* Contenido principal */}
                        <HeadingSmall title="Reportes" description="Acciones realizadas desde el principio del proyecto" />
                        {/* Ícono semitransparente */}
                        <ScrollText
                            size={70}
                            color="#22d3ee"
                            className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                        />
                    </div>
                    <Separator />
                </div>

                {/* Componente de Reporte de Compra */}
                <div className="mt-6">
                    <ReporteCompra compraId={compraId} />
                </div>
            </div>
        </AppLayout>
    );
}
```

---

### **Explicación del Funcionamiento**

1. **Backend**:

   - El endpoint `/compras/reporte/{id}` devuelve los detalles de la compra en formato JSON.
   - Los datos incluyen información general de la compra (fecha, almacén, proveedor) y los detalles de los productos comprados.
2. **Frontend**:

   - El componente `ReporteCompra` realiza una solicitud HTTP al backend para obtener los datos de la compra.
   - Una vez cargados los datos, muestra la información en una tabla estructurada.
3. **Integración**:

   - El componente `ReporteCompra` se integra en la página de reportes (`RepostesPage.tsx`) y recibe el ID de la compra como parámetro.

---

### **Resultado Final**

Con esta implementación, tendrás un reporte de compra funcional en React que muestra los detalles de una compra específica. Si necesitas más ajustes o tienes dudas, no dudes en preguntar. 😊
