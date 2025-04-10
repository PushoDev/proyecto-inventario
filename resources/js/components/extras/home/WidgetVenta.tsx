// Widget de Venta
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableCaption } from '@/components/ui/table';
import { LucideBaggageClaim, SendIcon, ShoppingBagIcon, ShoppingCart, StopCircle } from 'lucide-react';

const WidgetVenta = () => {
    return (
        <>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-blue-800 to-blue-400">
                {/* Ícono de fondo transparente */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <LucideBaggageClaim className="h-48 w-48 text-white" />
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 h-full p-6">
                    {/* Ícono en la esquina superior izquierda */}
                    <div className="absolute top-4 left-4">
                        <ShoppingBagIcon className="h-8 w-8 text-white" />
                    </div>

                    {/* Textos alineados a la derecha */}
                    <div className="flex h-full flex-col items-end justify-center space-y-2">
                        <h3 className="text-4xl font-bold text-white">Vender</h3>
                        <span className="text-lg text-white">Venta de Productos</span>
                    </div>

                    {/* Botón pequeño con Dialog */}
                    <Dialog>
                        {/* Botón que abre el diálogo */}
                        <DialogTrigger asChild>
                            <button className="absolute right-4 bottom-4 rounded-md bg-blue-800 px-4 py-1 text-sm font-semibold text-white shadow-md transition duration-300 hover:cursor-pointer hover:bg-white hover:text-blue-800">
                                Vender
                            </button>
                        </DialogTrigger>

                        {/* Contenido del diálogo */}
                        <DialogContent className="max-h-[500px] overflow-y-auto sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>Crear Venta</DialogTitle>
                                <DialogDescription>Completa los detalles para registrar una nueva venta.</DialogDescription>
                            </DialogHeader>

                            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="cliente" className="text-right">
                                            Cliente
                                        </Label>
                                        <Input id="cliente" className="col-span-3" placeholder="Nombre del cliente" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="producto" className="text-right">
                                            Producto
                                        </Label>
                                        <Input id="producto" className="col-span-3" placeholder="Nombre del producto" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="cantidad" className="text-right">
                                            Cantidad
                                        </Label>
                                        <Input id="cantidad" type="number" className="col-span-3" placeholder="Cantidad" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button variant="default" className="cursor-pointer hover:bg-blue-950 hover:text-white" type="submit">
                                    <ShoppingCart />
                                    Agregar
                                </Button>
                            </div>
                            <hr />
                            <Table>
                                <TableCaption>Venta de Productos</TableCaption>
                            </Table>

                            <DialogFooter className="sm:justify-center">
                                <Button variant="secondary" className="cursor-pointer hover:bg-blue-950">
                                    <SendIcon />
                                    Proceder
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="outline" className="hover:bg-destructive cursor-pointer">
                                        <StopCircle />
                                        Cancelar
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Patrón de fondo adicional */}
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </>
    );
};

export default WidgetVenta;
