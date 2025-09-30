"use client"

import { AlertTriangle, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const activities = [
  {
    type: "alert",
    title: "Low Stock Alert",
    description: "Steel bars running low (85/100 units)",
    time: "1 hour ago",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity & Notifications</CardTitle>
        <Button variant="link" className="gap-2 text-primary">
          <Mail className="h-4 w-4" />
          Send Email Alerts
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
            >
              <div className="rounded-lg bg-yellow-100 p-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
