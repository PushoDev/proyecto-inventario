import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArrowRightLeftIcon,
    BookOpenText,
    BoxesIcon,
    ChartNoAxesCombinedIcon,
    CheckCircleIcon,
    Computer,
    Github,
    IdCardIcon,
    Landmark,
    LucideShoppingCart,
    NotebookText,
    StoreIcon,
} from 'lucide-react';
import AppLogo from './app-logo';
import { SearchForm } from './extras/search-form';

const mainNavItems: NavItem[] = [
    // Caja Principal
    {
        title: 'Caja Principal',
        href: '/dashboard',
        icon: Computer,
    },
    // Logistica
    {
        title: 'Logistica General',
        href: '/logistica',
        icon: ChartNoAxesCombinedIcon,
    },
    // Categorias
    {
        title: 'Categorias',
        href: '/categorias',
        icon: CheckCircleIcon,
    },
    // Productos
    {
        title: 'Productos Disponibles',
        href: '/productos',
        icon: BoxesIcon,
    },
    // Alamcenes
    {
        title: 'Almacenes o Tiendas',
        href: '/almacenes',
        icon: StoreIcon,
    },
    // Movimientos
    {
        title: 'Movimientos',
        href: '/movimientos',
        icon: ArrowRightLeftIcon,
    },
    // Proveedores
    {
        title: 'Proveedores',
        href: '/proveedores',
        icon: LucideShoppingCart,
    },
    // Clientes
    {
        title: 'Clientes',
        href: '/clientes',
        icon: IdCardIcon,
    },
    // Cuentas
    {
        title: 'Cuentas Monetarias',
        href: '/cuentas',
        icon: Landmark,
    },
    // Reportes
    {
        title: 'Reportes',
        href: '/reportes',
        icon: NotebookText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio (Privado)',
        href: 'https://github.com/PushoDev',
        icon: Github,
    },
    {
        title: 'Documentación',
        href: '#',
        icon: BookOpenText,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                        <SearchForm />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
