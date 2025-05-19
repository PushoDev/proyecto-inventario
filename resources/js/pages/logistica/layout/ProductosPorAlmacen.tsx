'use client';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface AlmacenData {
    nombre_almacen: string;
    total_productos: number;
}

export interface ProductosPorAlmacenChartProps {
    data: AlmacenData[];
}

// Colores HEX definidos manualmente
const chartColors = ['#5d9ce5', '#5ddad3', '#3b82f6', '#facc15', '#f97316'];

const chartConfig = {
    visitors: {
        label: 'Productos Totales',
    },
} satisfies ChartConfig;

export function ProductosPorAlmacenCharts({ data }: ProductosPorAlmacenChartProps) {
    // Calcula el total de productos almacenados
    const totalProductos = React.useMemo(() => {
        return data.reduce((acc, item) => acc + item.total_productos, 0);
    }, [data]);

    // Mapea los datos al formato requerido por Recharts
    const chartData = data.map((item, index) => ({
        browser: item.nombre_almacen,
        visitors: item.total_productos,
        fill: chartColors[index % chartColors.length],
    }));

    {
        console.log('Datos recibidos:', data);
    }
    {
        console.log('chartData:', chartData);
    }
    {
        console.log('Total de productos:', totalProductos);
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Productos por Almacén</CardTitle>
                <CardDescription>Total de unidades almacenadas</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px] max-h-[250px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {totalProductos.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Unidades
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null; // ✅ Retorno seguro
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Total distribuido entre almacenes <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">Unidades totales por producto</div>
            </CardFooter>
        </Card>
    );
}
