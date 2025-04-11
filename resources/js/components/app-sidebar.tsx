import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    BoxesIcon,
    BusIcon,
    Computer,
    CreditCardIcon,
    Github,
    HomeIcon,
    IdCardIcon,
    LucideFolderCheck,
    LucideGrape,
    LucideShoppingCart,
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
        title: 'Logistica',
        href: '/logistica',
        icon: LucideGrape,
    },
    // Categorias
    {
        title: 'Categorias',
        href: '/categorias',
        icon: LucideFolderCheck,
    },
    // Productos
    {
        title: 'Productos',
        href: '/productos',
        icon: BoxesIcon,
    },
    // Alamcenes
    {
        title: 'Almacenes',
        href: '/almacenes',
        icon: HomeIcon,
    },
    // Movimientos
    {
        title: 'Movimientos',
        href: '/movimientos',
        icon: BusIcon,
    },
    // Cuentas
    {
        title: 'Cuentas',
        href: '/cuentas',
        icon: CreditCardIcon,
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
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: 'https://github.com/PushoDev',
        icon: Github,
    },
    {
        title: 'Documentación',
        href: '#',
        icon: BookOpen,
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
