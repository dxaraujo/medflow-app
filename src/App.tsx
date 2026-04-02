import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/dashboard-page"

export default function App() {
  return (
    <>
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <AppHeader />
        <DashboardPage />
      </main>
    </>
  )
}
