"use client"

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { status: "Approved", value: 65, fill: "blue" },
  { status: "Pending", value: 15, fill: "coral" },
  { status: "Rejected", value: 20, fill: "cyan" },
]

const chartConfig = {
  value: {
    label: "Requisitions",
  },
  approved: {
    label: "Approved",
    color: "blue",
  },
  pending: {
    label: "Pending",
    color: "coral",
  },
  rejected: {
    label: "Rejected",
    color: "cyan",
  },
}

export function RequisitionStatusChart() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Requisition Status</CardTitle>
        <CardDescription>Distribution of requisition statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[150px] lg:h-[350px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} formatter={(value) => `${value}%`} />
            <Pie data={chartData} dataKey="value" nameKey="status" innerRadius={80} outerRadius={140} strokeWidth={0}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cyan-500" />
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-coral-500" />
            <span className="text-muted-foreground">Rejected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
