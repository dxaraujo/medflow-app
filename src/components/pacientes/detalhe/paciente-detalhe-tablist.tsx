import { cn } from "@heroui/react"
import type { PatientDetailTabId } from "@/data/patient-detail-mock"

const TAB_OPTIONS = [
  { id: "evolucao" as const, label: "Evolução clínica" },
  { id: "dados_pessoais" as const, label: "Dados pessoais" },
  { id: "historico" as const, label: "Histórico de consultas" },
  { id: "prescricoes" as const, label: "Prescrições" },
  { id: "exames" as const, label: "Exames" },
] as const

type PacienteDetalheTablistProps = {
  value: PatientDetailTabId
  onChange: (tab: PatientDetailTabId) => void
}

export function PacienteDetalheTablist({ value, onChange }: PacienteDetalheTablistProps) {
  return (
    <div className="hide-scrollbar -mx-2 overflow-x-auto px-2 pb-6">
      <div
        role="tablist"
        aria-label="Seções do prontuário"
        className="flex items-center gap-6 border-b-0 md:gap-8"
      >
        {TAB_OPTIONS.map((opt) => {
          const selected = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              id={`tab-${opt.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${opt.id}`}
              className={cn(
                "whitespace-nowrap pb-4 font-body text-sm transition-colors",
                selected
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "border-b-2 border-transparent font-medium text-on-surface-variant hover:text-primary",
              )}
              onClick={() => onChange(opt.id)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
