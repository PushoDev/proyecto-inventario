import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
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
}

// Interface para los Productos
export interface ProductosProps {
    id: number;
    nombre_producto: string;
    marca_producto: string | null;
    codigo_producto: string | null;
    categoria: string | null; // Nombre de la categoría
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


