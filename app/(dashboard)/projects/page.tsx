import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProjectsContent } from "@/components/projects/project-content"


export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <ProjectsContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
