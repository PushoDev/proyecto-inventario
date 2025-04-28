import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookCheck, HandCoins } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logistica General',
        href: '/logistica',
    },
    {
        title: 'Cuentas',
        href: '/cuentas',
    },
    {
        title: 'Crear Cuenta',
        href: '',
    },
];

export default function Cuentas() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cuentas Monetarias" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Encabezado */}
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <header>
                        <div className="relative col-span-4 space-y-1 overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-800 p-4">
                            <HeadingSmall
                                title="Cuentas Monetarias"
                                description="Gestión de Cuentas fiscales, monetarias y deudas pendientes a Proveedores"
                            />
                            <HandCoins
                                size={70}
                                color="green"
                                className="pointer-events-none absolute right-2 bottom-0 translate-x-0 translate-y-[-5] transform animate-pulse opacity-40"
                            />
                        </div>
                        <Separator className="col-span-full my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={route('cuentas.index')}>
                                                <Button className="hover:bg-destructive cursor-pointer bg-red-400 hover:text-white">
                                                    <BookCheck />
                                                    Cancelar
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Cancelar Acción</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Separator orientation="vertical" />
                        </div>
                    </header>
                </div>

                {/* Crear Cuentas */}
            </div>
        </AppLayout>
    );
}
