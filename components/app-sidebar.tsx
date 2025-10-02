"use client"

import { usePathname } from "next/navigation"
import {
  House,
  Folder,
  FileText,
  Package,
  Database,
  ChartBar,
  ClockCounterClockwise,
  ShieldCheck,
  Gear,
  UsersThree,
} from "phosphor-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: House, url: "/" },
  { title: "Projects", icon: Folder, url: "/projects" },
  { title: "Requisitions", icon: FileText, url: "/requisitions" },
  { title: "Inventory", icon: Package, url: "/inventory" },
  { title: "Assets", icon: Database, url: "/assets" },
  { title: "Reports", icon: ChartBar, url:"/reports" },
  { title: "Audit Trail", icon: ClockCounterClockwise, url: "/audit-trail" },
]

const roleAccessItems = [
  { title: "Admin: Full System Access", icon: ShieldCheck },
  { title: "Store Manager: Inventory + Approvals", icon: Gear },
  { title: "Project Staff: Requisitions Only", icon: UsersThree },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Package size={22} weight="fill" className="text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">TrackSure</span>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`group relative flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all
                          ${isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                          }`}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary-foreground" />
                        )}
                        <item.icon size={20} weight={isActive ? "fill" : "regular"} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Access Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Role-Based Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-5 py-3">
              {roleAccessItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-2 text-xs text-sidebar-foreground/80"
                >
                  <item.icon size={16} weight="fill" className="mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item.title}</span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
