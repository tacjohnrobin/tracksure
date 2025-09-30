"use client"

import { StatsCards } from "@/components/stats-cards"
import { StockMovementChart } from "@/components/stock-movement-chart"
import { RequisitionStatusChart } from "@/components/requisition-status-chart"
import { RecentActivity } from "@/components/recent-activity"

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <StockMovementChart />
          <RequisitionStatusChart />
        </div>
        <RecentActivity />
      </div>
    </main>
  )
}
