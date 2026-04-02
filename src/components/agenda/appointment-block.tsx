import { cn } from "@heroui/react"
import { Pencil } from "lucide-react"
import type { AgendaAppointment, AgendaAppointmentKind } from "@/types/agenda"
import { AGENDA_START_HOUR, agendaTotalHours } from "@/components/agenda/agenda-constants"

const KIND_LABEL: Record<AgendaAppointmentKind, string> = {
  retorno: "RETORNO",
  primeira_consulta: "PRIMEIRA CONSULTA",
  procedimento: "PROCEDIMENTO",
  urgencia: "URGÊNCIA",
}

function formatTimeRange(startHour: number, durationHours: number): string {
  const end = startHour + durationHours
  const sh = Math.floor(startHour)
  const sm = Math.round((startHour - sh) * 60)
  const eh = Math.floor(end)
  const em = Math.round((end - eh) * 60)
  const a = `${String(sh).padStart(2, "0")}:${String(sm).padStart(2, "0")}`
  const b = `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}`
  return `${a} – ${b}`
}

type AppointmentBlockProps = {
  appointment: AgendaAppointment
  className?: string
}

export function AppointmentBlock({ appointment, className }: AppointmentBlockProps) {
  const { startHour, durationHours, kind, patientName, detail, badges } = appointment
  const total = agendaTotalHours()
  const topPct = ((startHour - AGENDA_START_HOUR) / total) * 100
  const heightPct = (durationHours / total) * 100

  const kindClass =
    kind === "retorno"
      ? "bg-primary text-on-primary"
      : kind === "primeira_consulta"
        ? "bg-sky-200 text-primary"
        : kind === "procedimento"
          ? "bg-agenda-procedure text-white"
          : "border-2 border-error bg-white text-on-surface shadow-sm"

  return (
    <div
      className={cn(
        "pointer-events-auto absolute left-1 right-1 z-10 flex min-h-0 flex-col gap-1 overflow-hidden rounded-lg px-2 py-1.5 text-left text-xs shadow-sm",
        kindClass,
        className,
      )}
      style={{
        top: `${topPct}%`,
        height: `${heightPct}%`,
      }}
    >
      <div className="flex flex-wrap items-center gap-1">
        {badges?.includes("urgente") && (
          <span className="rounded bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">URGENTE</span>
        )}
        <span className="font-semibold opacity-90">{formatTimeRange(startHour, durationHours)}</span>
      </div>
      <p className="truncate font-headline font-bold leading-tight">{patientName}</p>
      <p className="truncate text-[10px] font-medium uppercase tracking-wide opacity-90">{KIND_LABEL[kind]}</p>
      {detail ? <p className="line-clamp-2 text-[10px] opacity-80">{detail}</p> : null}
      {badges?.includes("presenca") && (
        <div className="mt-auto flex items-center gap-1">
          <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-on-primary">PRESENÇA</span>
          <button
            type="button"
            className="rounded p-0.5 text-primary hover:bg-black/5"
            aria-label="Editar presença"
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
