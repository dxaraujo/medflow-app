import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { AgendaPage } from "@/components/agenda/agenda-page"
import { DashboardPage } from "@/components/dashboard-page"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-7xl p-12">
      <p className="text-lg text-on-surface-variant">{title} — em breve.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <AppHeader />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/pacientes" element={<PlaceholderPage title="Pacientes" />} />
          <Route path="/prontuarios" element={<PlaceholderPage title="Prontuários" />} />
          <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
