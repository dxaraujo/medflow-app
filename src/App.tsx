import { AppFooter } from "@/components/app-footer"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { AgendaPage } from "@/components/agenda/agenda-page"
import { DashboardPage } from "@/components/dashboard-page"
import { PacientesPage } from "@/components/pacientes/pacientes-page"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto p-12">
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
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/prontuarios" element={<PlaceholderPage title="Prontuários" />} />
          <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
        </Routes>
        <AppFooter />
      </main>
    </BrowserRouter>
  )
}
