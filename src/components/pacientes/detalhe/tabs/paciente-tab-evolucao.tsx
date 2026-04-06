import { PacienteAlertasChips } from "@/components/pacientes/detalhe/paciente-alertas-chips"
import { PacienteEvolucaoEditor } from "@/components/pacientes/detalhe/paciente-evolucao-editor"
import { PacienteQuickActions } from "@/components/pacientes/detalhe/paciente-quick-actions"
import { PacienteTimeline } from "@/components/pacientes/detalhe/paciente-timeline"
import { PacienteVitaisSidebar } from "@/components/pacientes/detalhe/paciente-vitais-sidebar"
import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"

export function PacienteTabEvolucao() {
  const detail = usePatientDetailOutlet()
  const { hero, timelineEvents } = detail

  return (
    <div
      role="tabpanel"
      id="panel-evolucao"
      aria-labelledby="tab-evolucao"
      className="contents"
    >
      <div className="col-span-12 lg:col-span-3">
        <div className="flex flex-col gap-6">
          <PacienteVitaisSidebar vitals={detail.vitals} />
          <PacienteAlertasChips allergies={detail.allergies} alerts={detail.alerts} />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PacienteEvolucaoEditor hero={hero} />
            <div className="flex min-h-0 flex-col gap-6">
              <PacienteQuickActions />
              <PacienteTimeline events={timelineEvents} layout="bento" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
