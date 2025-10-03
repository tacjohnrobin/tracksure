"use client"

import { Bell, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-18 items-center justify-between border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <SidebarTrigger />
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="secondary" size="sm" className="rounded-full">
            Barcode
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            QR Codes
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            Mobile
          </Button>
        </div>
        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block text-sm">
          <span className="text-muted-foreground">Welcome, </span>
          <span className="font-medium">William Mugenya</span>
        </div>
        <div className="hidden sm:block text-xs text-muted-foreground">
          Role: <span className="text-foreground">Project Staff</span>
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>
        </div>
        <Button variant="destructive" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}
