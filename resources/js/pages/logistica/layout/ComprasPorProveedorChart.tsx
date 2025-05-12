//  Compras por proveedor

'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface CompraData {
    nombre_proveedor: string;
    cantidad_compras: number;
    total_gastado: number;
}

export interface ComprasPorProveedorPieProps {
    data: CompraData[];
}

// Colores HEX definidos manualmente para evitar conflictos con CSS
const chartColors = ['#fff', '#5ddad3', '#3b82f6', '#facc15', '#f97316'];

const chartConfig = {
    visitors: {
        label: 'Total Gastado',
    },
} satisfies ChartConfig;

export function ComprasPorProveedorPie({ data }: ComprasPorProveedorPieProps) {
    // ✅ Verifica que los datos lleguen correctamente
    console.log('Datos recibidos en ComprasPorProveedorPie:', data);

    const chartData = data.map((item, index) => ({
        browser: item.nombre_proveedor,
        visitors: item.total_gastado,
        fill: chartColors[index % chartColors.length],
    }));

    // ✅ Verifica que chartData se genere correctamente
    console.log('chartData transformado:', chartData);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Compras por Proveedor</CardTitle>
                <CardDescription>Total gastado por proveedor</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="visitors" nameKey="browser" label />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Distribución por proveedores <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">Total gastado a cada Proveedor</div>
            </CardFooter>
        </Card>
    );
}
