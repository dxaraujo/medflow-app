import { PATIENT_TAB_PATH_SEGMENT } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import type { PatientDetailTabId } from "@/data/patient-detail-mock"
import { cn } from "@heroui/react"
import { Link, useLocation } from "react-router-dom"

const TAB_OPTIONS = [
  { id: "evolucao" as const, label: "Evolução clínica" },
  { id: "dados_pessoais" as const, label: "Dados pessoais" },
  { id: "historico" as const, label: "Histórico de consultas" },
  { id: "prescricoes" as const, label: "Prescrições" },
  { id: "exames" as const, label: "Exames" },
] as const satisfies ReadonlyArray<{ id: PatientDetailTabId; label: string }>

type PacienteDetalheTablistProps = {
  patientId: string
}

export function PacienteDetalheTablist({ patientId }: PacienteDetalheTablistProps) {
  const { pathname } = useLocation()

  return (
    <div className="hide-scrollbar overflow-x-auto px-2 pb-6">
      <div
        role="tablist"
        aria-label="Seções do prontuário"
        className="flex items-center gap-6 border-b-0 md:gap-8"
      >
        {TAB_OPTIONS.map((opt) => {
          const segment = PATIENT_TAB_PATH_SEGMENT[opt.id]
          const to = `/pacientes/${patientId}/${segment}`
          const selected =
            opt.id === "historico"
              ? pathname.startsWith(`/pacientes/${patientId}/historico`)
              : pathname === to
          return (
            <Link
              key={opt.id}
              to={to}
              id={`tab-${opt.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${opt.id}`}
              className={cn(
                "whitespace-nowrap border-b-2 pb-4 font-body text-sm transition-colors",
                selected
                  ? "border-primary font-bold text-primary"
                  : "border-transparent font-medium text-on-surface-variant hover:text-primary",
              )}
            >
              {opt.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
