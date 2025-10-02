"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, PieChart, Cell, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { reportsData } from "@/data/reports-data"
import { FileText, FileSpreadsheet, TrendingUp } from "lucide-react"

const pieChartConfig = {
  value: {
    label: "Stock Value",
  },
}

const barChartConfig = {
  value: {
    label: "Stock Value (KES)",
    color: "hsl(217, 91%, 60%)",
  },
}

export function ReportsContent() {
  const { categoryData, monthlyMovements, quickStats } = reportsData

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart - Stock Value by Category */}
        <Card className="border-none shadow-sm p-6">
          <CardHeader>
            <CardTitle>Stock Value by Category (KES)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieChartConfig} className="mx-auto h-[300px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} formatter={(value) => `${value}%`} />
                <Pie data={categoryData} dataKey="value" nameKey="category" outerRadius={120} strokeWidth={0}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
              {categoryData.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Monthly Movements */}
        <Card className="border-none shadow-sm p-6">
          <CardHeader>
            <CardTitle>Monthly Movements (KES)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="h-[300px] w-full">
              <BarChart data={monthlyMovements} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `KES ${(value / 1000000).toFixed(1)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent formatter={(value) => `KES ${(Number(value) / 1000000).toFixed(2)}M`} />
                  }
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-sm bg-[hsl(217,91%,60%)]" />
              <span className="text-muted-foreground">Stock Value (KES)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Cards Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer border-none shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Inventory Report</h3>
            <p className="text-sm text-muted-foreground">PDF Export</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer border-none shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <FileSpreadsheet className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Stock Movement</h3>
            <p className="text-sm text-muted-foreground">Excel Export</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer border-none shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Asset Report</h3>
            <p className="text-sm text-muted-foreground">Analytics</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Statistics */}
      <Card className="border-none shadow-sm p-6">
        <CardHeader>
          <CardTitle>Quick Statistics (KES)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50 p-6">
              <div className="text-4xl font-bold text-blue-600">{quickStats.requisitionsThisMonth}</div>
              <div className="mt-2 text-sm text-muted-foreground">Requisitions This Month</div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-6">
              <div className="text-4xl font-bold text-green-600">
                KES {(quickStats.stockReceived / 1000000).toFixed(1)}M
              </div>
              <div className="mt-2 text-sm text-muted-foreground">Stock Received</div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-6">
              <div className="text-4xl font-bold text-red-600">
                KES {(quickStats.stockIssued / 1000000).toFixed(1)}M
              </div>
              <div className="mt-2 text-sm text-muted-foreground">Stock Issued</div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-purple-50 p-6">
              <div className="text-4xl font-bold text-purple-600">{quickStats.reqApprovalRate}%</div>
              <div className="mt-2 text-sm text-muted-foreground">Req Approval Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
