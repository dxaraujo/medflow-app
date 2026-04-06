import { CalendarDays } from "lucide-react"
import { SegmentedToggle } from "@/components/dashboard/segmented-toggle"

export type AgendaViewMode = "semana" | "mes" | "dia"

const VIEW_OPTIONS = [
  { id: "semana" as const, label: "Semana" },
  { id: "mes" as const, label: "Mês" },
  { id: "dia" as const, label: "Dia" },
]

type AgendaWeekHeaderProps = {
  weekRangeLabel: string
  view: AgendaViewMode
  onViewChange: (next: AgendaViewMode) => void
}

export function AgendaWeekHeader({ weekRangeLabel, view, onViewChange }: AgendaWeekHeaderProps) {
  return (
    <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 className="font-headline mb-2 text-4xl font-extrabold tracking-tight text-on-background">
          Agenda Semanal
        </h2>
        <p className="flex items-center gap-2 text-on-surface-variant">
          <CalendarDays className="size-4 shrink-0" aria-hidden />
          {weekRangeLabel}
        </p>
      </div>
      <SegmentedToggle value={view} onChange={onViewChange} options={VIEW_OPTIONS} className="mb-0" />
    </div>
  )
}
