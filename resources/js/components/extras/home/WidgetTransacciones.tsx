// Widget Transacciones
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DiamondPercent, LucideClockArrowDown } from 'lucide-react';

const WidgetTransacciones = () => {
    return (
        <>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-green-800 to-green-400">
                {/* Ícono de fondo transparente */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <DiamondPercent className="h-48 w-48 text-white" />
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 h-full p-6">
                    {/* Ícono en la esquina superior izquierda */}
                    <div className="absolute top-4 left-4">
                        <LucideClockArrowDown className="h-8 w-8 text-white" />
                    </div>

                    {/* Textos alineados a la derecha */}
                    <div className="flex h-full flex-col items-end justify-center space-y-2">
                        <h3 className="text-4xl font-bold text-white">Transacciones</h3>
                        <span className="text-lg text-white">Movimientos Internos</span>
                    </div>

                    {/* Botón pequeño */}
                    <button className="absolute right-4 bottom-4 rounded-md bg-green-800 px-4 py-1 text-sm font-semibold text-white shadow-md transition duration-300 hover:animate-pulse hover:cursor-pointer hover:bg-white hover:text-green-800">
                        Transacciones
                    </button>
                </div>

                {/* Patrón de fondo adicional */}
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </>
    );
};

export default WidgetTransacciones;
