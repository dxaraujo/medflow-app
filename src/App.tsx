import { AppFooter } from "@/components/app-footer"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { AgendaPage } from "@/components/agenda/agenda-page"
import { DashboardPage } from "@/components/dashboard-page"
import { PacienteConsultaDetalhePage } from "@/components/pacientes/detalhe/paciente-consulta-detalhe-page"
import { PacienteDetalheLayout } from "@/components/pacientes/detalhe/paciente-detalhe-layout"
import { PacienteTabDadosPessoais } from "@/components/pacientes/detalhe/tabs/paciente-tab-dados-pessoais"
import { PacienteTabEvolucao } from "@/components/pacientes/detalhe/tabs/paciente-tab-evolucao"
import { PacienteTabExames } from "@/components/pacientes/detalhe/tabs/paciente-tab-exames"
import { PacienteTabHistorico } from "@/components/pacientes/detalhe/tabs/paciente-tab-historico"
import { PacienteTabPrescricoes } from "@/components/pacientes/detalhe/tabs/paciente-tab-prescricoes"
import { PacientesPage } from "@/components/pacientes/pacientes-page"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

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
          <Route path="/pacientes/:patientId" element={<PacienteDetalheLayout />}>
            <Route index element={<Navigate to="evolucao" replace />} />
            <Route path="evolucao" element={<PacienteTabEvolucao />} />
            <Route path="dados-pessoais" element={<PacienteTabDadosPessoais />} />
            <Route path="historico/consultas/:consultId" element={<PacienteConsultaDetalhePage />} />
            <Route path="historico" element={<PacienteTabHistorico />} />
            <Route path="prescricoes" element={<PacienteTabPrescricoes />} />
            <Route path="exames" element={<PacienteTabExames />} />
          </Route>
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/prontuarios" element={<PlaceholderPage title="Prontuários" />} />
          <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
        </Routes>
        <AppFooter />
      </main>
    </BrowserRouter>
  )
}
