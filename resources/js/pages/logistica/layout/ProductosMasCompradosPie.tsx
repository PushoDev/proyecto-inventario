// Productos Mas comprados

'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ProductoData {
    nombre_producto: string;
    total_cantidad: number;
}

export interface ProductosMasCompradosPieProps {
    data: ProductoData[];
}

// Mapea los colores del tema
const chartColors = ['#5d9ce5', '#5ddad3', '#3b82f6', '#facc15', '#f97316'];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
} satisfies ChartConfig;

export function ProductosMasCompradosPie({ data }: ProductosMasCompradosPieProps) {
    // ✅ Verifica que los datos lleguen correctamente
    console.log('Datos recibidos en ProductosMasComprados:', data);

    const chartData = data.map((item, index) => ({
        browser: item.nombre_producto,
        visitors: parseFloat(item.total_cantidad),
        fill: chartColors[index % chartColors.length],
    }));

    // ✅ Verifica que chartData se genere correctamente
    console.log('chartData transformado:', chartData);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Top de Productos</CardTitle>
                <CardDescription>Cantidad total comprada</CardDescription>
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
                    Productos más solicitados <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">Top Productos más Comprados</div>
            </CardFooter>
        </Card>
    );
}
