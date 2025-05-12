import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';


export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

// Grupo en el SideBar
export interface NavGroup {
    id: string;
    title: string;
    collapsible?: boolean;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Calendario
interface CalendarProps {
    mode: 'single' | 'multiple';
    selected: Date | undefined;
    onSelect: (date: Date | undefined) => void;
    className?: string;
}

// Interface para la Caja Principal
export interface CajaPrincipalProps {
    montoGeneralInvertido: number;
}

// Interface para Categorias
export interface CategoriasProps {
    id: number;
    nombre_categoria: string;
    descripcion_categoria: string;
    activar_categoria: boolean;
    created_at: string;
    updated_at: string;
}

// Interface para Clientes
export interface ClienteProps {
    id: number;
    nombre_cliente: string;
    telefono_cliente: string;
    direccion_cliente?: string | null; // Opcional
    ciudad_cliente?: string | null; // Opcional
    created_at: string;
    updated_at: string;
}

// Interface para Proveedores
export interface ProveedorProps {
    id: number;
    nombre_proveedor: string;
    telefono_proveedor: string;
    correo_proveedor?: string | null;
    localidad_proveedor: string;
    notas_proveedor?: string | null;
    created_at: string;
    updated_at: string;
}

// Interface para Almacenes
export interface AlmacenProps {
    id: number;
    nombre_almacen: string;
    telefono_almacen: string;
    correo_almacen: string;
    provincia_almacen: string;
    ciudad_almacen: string;
    notas_almacen: string;
    created_at: string;
    updated_at: string;
}

// Interface para la Logistica
export interface LogisticaProps {
    totalCategorias: number;
    categoriasActivas: number;
    totalProveedores: number;
    totalClientes: number;
    totalAlmacenes: number;
    totalProductos: number;
    totalUnidades: number;
    inversionTotal: number;
    totalCuentas: number;
    saldoCuentas: number;
    montoGeneralInvertido: number;
}

// Interface para los Productos
export interface ProductosProps {
    id: number;
    nombre_producto: string;
    marca_producto: string | null;
    codigo_producto: string | null;
    categoria: string | null; // Nombre de la categoría
    categoria_id: number;
    precio_compra_producto: number;
    cantidad_producto: number;
    imagen_url: string | null;
}

// Interface para el formulario de Comprar Productos
export interface ProductoComprarProps {
    id: number;
    producto: string;
    categoria: string;
    codigo: string;
    cantidad: number;
    precio: number;
}

// Interface para las cuentas del Negocio
export interface CuentaNegocioProps {
    id: number;
    nombre_cuenta: string;
    saldo_cuenta: number;
    deuda: number;
    tipo_cuenta: 'permanentes' | 'temporales';
    notas_cuenta?: string;
    created_at?: string;
    updated_at?: string;
}

// Interface para las deudas con los Proveedores
export interface DeudasProveedoresProps {
    id: number;
    proveedor_id: number;
    monto_deuda: number;
    fecha_generacion: string;
    estado: 'pendiente' | 'pagado';
    notas?: string;
    created_at?: string;
    updated_at?: string;
}

// Interface para la solicitud de compra
export interface CompraRequest {
    compra: 'deuda_proveedor' | 'pago_cash';
    cuenta_id: number;
    almacen: string;
    proveedor: string;
    fecha: string;
    productos: ProductoComprarProps[];
}

// Interface para respuesta de compra (si es necesario)
export interface CompraResponse {
    id: number;
    tipo_compra: 'deuda_proveedor' | 'pago_cash';
    cuenta: {
        id: number;
        saldo: number;
        deuda: number;
    };
    almacen: string;
    proveedor: string;
    fecha: string;
    total: number;
    productos: ProductoComprarProps[];
}

// Interface Productos mas comprados
export interface ProductosMasCompradosRef {
    nombre_producto: string;
    total_cantidad: number;
    veces_comprado: number;
}
export type ProductosMasCompradosList = ProductosMasCompradosRef[];

// Interface de Compras por periodos
export interface CompraPorPeriodoRef {
    id: number;
    fecha_compra: string;
    total_compra: number;
    nombre_proveedor: string;
    tipo_compra: 'deuda_proveedor' | 'pago_cash';
}

// Interface de Gastos Mensuales
export interface GastoMensualRef {
    mes_anio: string;
    total: number;
    cantidad_compras: number;
}

// Interface de Compras por Proveedor
export interface CompraPorProveedorRef {
    id: number;
    fecha_compra: string;
    total_compra: number;
    tipo_compra: 'deuda_proveedor' | 'pago_cash';
}
