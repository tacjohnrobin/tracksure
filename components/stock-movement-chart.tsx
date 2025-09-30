"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", received: 2500000, issued: 1500000 },
  { month: "Feb", received: 3000000, issued: 1800000 },
  { month: "Mar", received: 2800000, issued: 1500000 },
  { month: "Apr", received: 3200000, issued: 900000 },
  { month: "May", received: 2700000, issued: 2000000 },
  { month: "Jun", received: 3500000, issued: 1700000 },
]

const chartConfig = {
  received: {
    label: "Stock Received (KES)",
    color: "blue",
  },
  issued: {
    label: "Stock Issued (KES)",
    color: "cyan",
  },
}

export function StockMovementChart() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Stock Movement (KES)</CardTitle>
        <CardDescription>Monthly stock received and issued values</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => `KES ${(Number(value) / 1000000).toFixed(2)}M`} />}
            />
            <Line type="monotone" dataKey="received" stroke="var(--color-received)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="issued" stroke="var(--color-issued)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />
            <span className="text-muted-foreground">Stock Received (KES)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="text-muted-foreground">Stock Issued (KES)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
