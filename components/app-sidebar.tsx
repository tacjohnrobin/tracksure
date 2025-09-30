"use client"

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Package,
  BarChart3,
  FileBarChart,
  History,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react"
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
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Projects", icon: FolderKanban, url: "/projects" },
  { title: "Requisitions", icon: FileText, url: "#" },
  { title: "Inventory", icon: Package, url: "#" },
  { title: "Assets", icon: BarChart3, url: "#" },
  { title: "Reports", icon: FileBarChart, url: "#" },
  { title: "Audit Trail", icon: History, url: "#" },
]

const roleAccessItems = [
  { title: "Admin: Full System Access", icon: ShieldCheck },
  { title: "Store Manager: Inventory + Approvals", icon: UserCog },
  { title: "Project Staff: Requisitions Only", icon: Users },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">TrackSure</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-4">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            Role-Based Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-4 py-2">
              {roleAccessItems.map((item) => (
                <div key={item.title} className="flex items-start gap-2 text-xs text-sidebar-foreground/80">
                  <item.icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
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
