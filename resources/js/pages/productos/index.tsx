import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProductosProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBasket } from 'lucide-react';
import { columns } from './layouts/Columnas';
import { DataTableProductos } from './layouts/DataTableProductos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: route('productos.index'),
    },
];

export default function ProductosPage({ productos }: { productos: ProductosProps[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos - Glorieta.Shop" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <header>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            <HeadingSmall title="Productos Adquiridos" description="Gestión de los productos disponibles del negocio" />
                            <ShoppingBasket
                                size={70}
                                color="#f59e0b"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <Link href={route('comprar.index')}>
                                    <Button className="bg-blue-400 text-blue-950 hover:bg-blue-900 hover:text-white">Nueva Compra</Button>
                                </Link>
                            </div>
                        </div>
                    </header>
                </div>

                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <div>
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        New Window <MenubarShortcut>⌘N</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarSub>
                                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>Email link</MenubarItem>
                                            <MenubarItem>Messages</MenubarItem>
                                            <MenubarItem>Notes</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarSub>
                                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>Search the web</MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem>Find...</MenubarItem>
                                            <MenubarItem>Find Next</MenubarItem>
                                            <MenubarItem>Find Previous</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSeparator />
                                    <MenubarItem>Cut</MenubarItem>
                                    <MenubarItem>Copy</MenubarItem>
                                    <MenubarItem>Paste</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>View</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                                    <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
                                    <MenubarSeparator />
                                    <MenubarItem inset>
                                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem disabled inset>
                                        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Profiles</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup value="benoit">
                                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                                        <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                    <MenubarSeparator />
                                    <MenubarItem inset>Edit...</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem inset>Add Profile...</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                    <DataTableProductos columns={columns} data={productos} />
                </div>
            </div>
        </AppLayout>
    );
}
