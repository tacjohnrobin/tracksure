"use client"

import { TrendingUp, CheckCircle, DollarSign, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Active Projects",
    value: "12",
    icon: TrendingUp,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Approvals",
    value: "5",
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Stock Value",
    value: "KES 6.2M",
    icon: DollarSign,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Stock Alerts",
    value: "8",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
