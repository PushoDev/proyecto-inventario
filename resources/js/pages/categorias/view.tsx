import { Separator } from "@/components/ui/separator"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorias',
        href: '/categorias',
    },
];

export default function VerContenidoCategoriasPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caja Principal" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Barra de Menus */}
                <div>
                    <div className="space-y-1 bg-gray-500 rounded-2xl">
                        <h4 className="text-sm font-medium leading-none">
                            Categorias</h4>
                        <p className="text-sm text-muted-foreground">
                            An open-source UI component library.
                        </p>
                    </div>
                    <Separator className="my-4" />
                </div>
                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant='ghost'>
                                    Hover
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to library</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </AppLayout>
    );
}
