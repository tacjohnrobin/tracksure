import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportsContent } from "@/components/reports-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AssetsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <ReportsContent />
        </div>
      </div>
    </SidebarProvider>
  )
}
