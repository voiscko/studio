'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as BarChartIcon } from 'lucide-react';

const chartData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 1.5 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 2 },
];

const chartConfig = {
  hours: {
    label: "Study Hours",
    color: "hsl(var(--primary))",
  },
}

export default function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Study Progress</CardTitle>
          <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Your study hours over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
            <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={30}
                />
                 <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
