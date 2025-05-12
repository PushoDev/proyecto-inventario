// resources/js/Components/GastosMensualesChart.tsx

'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface GastoData {
    mes_anio: string;
    total: number;
}

export interface GastosMensualesChartProps {
    data: GastoData[];
}

const chartConfig = {
    total: {
        label: 'Gasto Total',
        color: '#f87171',
    },
} satisfies ChartConfig;

export function GastosMensualesChart({ data }: GastosMensualesChartProps) {
    return (
        <Card className="@container/card col-span-1">
            <CardHeader>
                <CardTitle>Gastos Mensuales</CardTitle>
                <CardDescription>Últimos meses registrados</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="total" hide />
                        <YAxis
                            dataKey="mes_anio"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(5, 7) + '/' + value.slice(0, 4)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Tendencia de gastos <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">Gastos totales por mes</div>
            </CardFooter>
        </Card>
    );
}
