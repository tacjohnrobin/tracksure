import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { RequisitionsContent } from "@/components/requisitions-content"

export default function RequisitionsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <RequisitionsContent />
        </div>
      </div>
    </SidebarProvider>
  )
}
