import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowUpToLine,
    BookOpenText,
    BoxesIcon,
    ChartNoAxesCombinedIcon,
    CheckCircleIcon,
    CirclePlus,
    Computer,
    Github,
    IdCardIcon,
    Landmark,
    LandPlot,
    LucideShoppingCart,
    NotebookText,
    NotepadTextDashedIcon,
    Repeat,
    StoreIcon,
} from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';

const navGroups = [
    {
        id: 'general',
        title: 'General',
        collapsible: false,
        items: [
            { title: 'Caja Principal', href: '/dashboard', icon: Computer },
            { title: 'Logística General', href: '/logistica', icon: ChartNoAxesCombinedIcon },
        ],
    },
    {
        id: 'inventario',
        title: 'Inventario',
        collapsible: true,
        items: [
            { title: 'Categorías', href: '/categorias', icon: CheckCircleIcon },
            { title: 'Productos Disponibles', href: '/productos', icon: BoxesIcon },
            { title: 'Almacenes o Tiendas', href: '/almacenes', icon: StoreIcon },
        ],
    },
    {
        id: 'operaciones',
        title: 'Operaciones',
        collapsible: true,
        items: [
            { title: 'Movimientos', href: '/movimientos', icon: Repeat },
            { title: 'Proveedores', href: '/proveedores', icon: LucideShoppingCart },
            { title: 'Clientes', href: '/clientes', icon: IdCardIcon },
        ],
    },
    {
        id: 'finanzas',
        title: 'Finanzas',
        collapsible: false,
        items: [
            {
                title: 'Cuentas Monetarias',
                href: '/cuentas',
                icon: Landmark,
            },
            {
                title: 'Deudas Pendientes',
                href: '/deudas',
                icon: LandPlot,
            },
        ],
    },
    {
        id: 'reportes',
        title: 'Reportes',
        collapsible: true,
        items: [
            {
                title: 'Reportes',
                href: '/reportes',
                icon: NotebookText,
            },
            {
                title: 'Historial de Operaciones',
                href: '/historial',
                icon: NotepadTextDashedIcon,
            },
        ],
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
    const [openGroups, setOpenGroups] = useState<Set<string>>(
        () => new Set(navGroups.filter((group) => !group.collapsible).map((group) => group.id)),
    );
    const { url } = usePage<{ url: string }>().props;

    const toggleGroup = (groupId: string) => {
        setOpenGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(groupId)) {
                newSet.delete(groupId);
            } else {
                newSet.add(groupId);
            }
            return newSet;
        });
    };

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
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="pt-4">
                {navGroups.map((group) => (
                    <SidebarGroup key={group.id}>
                        <SidebarGroupLabel
                            onClick={group.collapsible ? () => toggleGroup(group.id) : undefined}
                            className={`flex w-full items-center justify-between ${group.collapsible ? 'hover:bg-muted cursor-pointer' : ''} px-3 py-2 transition-colors`}
                        >
                            <span className="truncate">{group.title}</span>
                            {group.collapsible &&
                                (openGroups.has(group.id) ? (
                                    <ArrowUpToLine className="h-4 w-4 transition-transform" />
                                ) : (
                                    <CirclePlus className="h-4 w-4 transition-transform" />
                                ))}
                        </SidebarGroupLabel>

                        <div className={`overflow-hidden transition-all ${group.collapsible ? 'duration-300' : ''}`}>
                            {(!group.collapsible || openGroups.has(group.id)) && (
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item, itemIndex) => {
                                            const isActive = url === item.href;
                                            return (
                                                <SidebarMenuItem key={itemIndex}>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            href={item.href}
                                                            prefetch
                                                            className={`flex w-full items-center px-3 py-2 ${isActive ? 'bg-primary rounded-md text-white' : ''} hover:bg-muted transition-colors`}
                                                            aria-current={isActive ? 'page' : undefined}
                                                        >
                                                            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                            <span className="truncate">{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            )}
                        </div>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
