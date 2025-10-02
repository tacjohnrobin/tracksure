import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuditTrailContent } from "@/components/audit-trail-content"

export default function AuditTrailPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <AuditTrailContent />
        </div>
      </div>
    </SidebarProvider>
  )
}
