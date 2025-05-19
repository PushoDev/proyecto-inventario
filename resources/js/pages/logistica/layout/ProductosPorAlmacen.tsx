'use client';

import * as React from 'react';
import { ChartProps, Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AlmacenData {
    nombre_almacen: string;
    total_productos: number;
}

export interface ProductosPorAlmacenChartProps {
    data: AlmacenData[];
}

// Colores:
const chartColors = ['#ef4444', '#14b8a6', '#6366f1', '#d946ef', '#f43f5e'];

export function ProductosPorAlmacenCharts({ data }: ProductosPorAlmacenChartProps) {
    const chartData = data.map((item, index) => ({
        month: item.nombre_almacen.toLowerCase().replace(/\s+/g, '_'),
        visitors: Number(item.total_productos),
        fill: chartColors[index % chartColors.length],
    }));

    const chartConfig = React.useMemo(() => {
        return {
            visitors: {
                label: 'Productos Totales',
            },
            ...data.reduce(
                (acc, item, index) => {
                    const key = item.nombre_almacen.toLowerCase().replace(/\s+/g, '_');
                    acc[key] = {
                        label: item.nombre_almacen,
                        color: chartColors[index % chartColors.length],
                    };
                    return acc;
                },
                {} as Record<string, { label: string; color: string }>,
            ),
        };
    }, [data]);

    const [activeMonth, setActiveMonth] = React.useState(chartData[0]?.month || '');
    const activeIndex = React.useMemo(() => chartData.findIndex((item) => item.month === activeMonth), [chartData, activeMonth]);

    const months = React.useMemo(() => chartData.map((item) => item.month), [chartData]);

    const totalProductos = React.useMemo(() => {
        return chartData.reduce((acc, item) => acc + item.visitors, 0);
    }, [chartData]); // ✅ Ahora tiene todas las dependencias

    return (
        <Card data-chart="productos-por-almacen" className="flex flex-col">
            <ChartStyle id="productos-por-almacen" config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Productos por Almacén</CardTitle>
                    <CardDescription>Distribución de productos entre almacenes</CardDescription>
                </div>
                <Select value={activeMonth} onValueChange={setActiveMonth}>
                    <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Selecciona un almacén">
                        <SelectValue placeholder="Selecciona un almacén" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {months.map((key) => {
                            const config = chartConfig[key as keyof typeof chartConfig];
                            if (!config || key === 'visitors') return null;
                            return (
                                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="flex h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: config.color }} />
                                        {config.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer id="productos-por-almacen" config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="month"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                                </g>
                            )}
                        >
                            {/* Corrección del Label */}
                            <Label
                                content={({ viewBox }: { viewBox?: ChartProps['viewBox'] }) => {
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
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
