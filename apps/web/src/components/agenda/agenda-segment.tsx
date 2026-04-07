import { Button, cn } from "@heroui/react"
import { CirclePlus, MoreVertical, Pencil, Palmtree, UtensilsCrossed, CalendarOff } from "lucide-react"
import type { AgendaAppointmentKind, AgendaWeekSegment } from "@/types/agenda"

function appointmentCardClasses(kind: AgendaAppointmentKind): string {
  switch (kind) {
    case "primeira_consulta":
      return "bg-secondary-container text-on-secondary-container border-secondary"
    case "retorno":
      return "bg-primary-container text-on-primary border-primary"
    case "procedimento":
      return "bg-tertiary-container text-on-primary border-tertiary"
    case "urgencia":
      return "bg-error-container/30 text-on-error-container border-error"
  }
}

type AgendaSegmentProps = {
  segment: AgendaWeekSegment
}

export function AgendaSegment({ segment }: AgendaSegmentProps) {
  switch (segment.type) {
    case "appointment": {
      const { variant = "default" } = segment
      if (variant === "urgent_expanded") {
        return (
          <div className="relative z-10 scale-[1.03] rounded-xl border border-primary/10 bg-surface-container-lowest p-4 shadow-lg dark:bg-slate-900">
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded-full bg-error-container px-2 py-0.5 text-[9px] font-bold text-on-error-container">
                URGENTE
              </span>
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                className="min-w-8 text-slate-300"
                aria-label="Mais opções"
              >
                <MoreVertical className="size-4" />
              </Button>
            </div>
            <p className="text-[10px] font-bold text-slate-400">{segment.timeLabel}</p>
            <p className="text-sm font-bold text-primary">{segment.patientName}</p>
            {segment.detail ? (
              <p className="mb-3 text-[10px] text-on-surface-variant">{segment.detail}</p>
            ) : null}
            <div className="flex gap-2">
              <Button size="sm" className="h-8 flex-1 rounded-full text-[10px] font-bold">
                PRESENÇA
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="secondary"
                className="h-8 min-w-8 rounded-full bg-surface-container-low text-primary"
                aria-label="Editar agendamento"
              >
                <Pencil className="size-4" />
              </Button>
            </div>
          </div>
        )
      }
      const surface = appointmentCardClasses(segment.kind)
      return (
        <div
          className={cn(
            "cursor-pointer rounded-xl border-l-4 p-3 shadow-sm transition-transform hover:scale-[1.02]",
            surface,
          )}
        >
          <p className="text-[10px] font-bold uppercase opacity-70">{segment.timeLabel}</p>
          <p className="truncate text-xs font-bold">{segment.patientName}</p>
          {segment.detail ? <p className="text-[9px] opacity-80">{segment.detail}</p> : null}
        </div>
      )
    }
    case "empty_slot":
      return (
        <div
          className={cn(
            "group flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-outline-variant/30 transition-colors hover:bg-surface-container-lowest",
            segment.minHeightClass,
          )}
        >
          <CirclePlus className="size-6 text-outline-variant opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      )
    case "lunch":
      return (
        <div className="flex h-12 items-center justify-center opacity-30">
          <UtensilsCrossed className="size-4 text-on-surface-variant" aria-hidden />
        </div>
      )
    case "free_block":
      return (
        <div
          className={cn(
            "group flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-outline-variant/30 transition-colors hover:bg-surface-container-lowest",
            segment.minHeightClass,
          )}
        >
          <p className="text-[10px] font-bold text-outline-variant opacity-0 transition-opacity group-hover:opacity-100">
            {segment.label}
          </p>
        </div>
      )
    case "blocked": {
      const Icon = segment.icon === "beach_access" ? Palmtree : CalendarOff
      return (
        <div
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant/30 p-4 text-center transition-colors hover:bg-surface-container-lowest",
            segment.minHeightClass,
          )}
        >
          <Icon className="mb-1 size-6 text-outline-variant" aria-hidden />
          <p className="text-[10px] font-bold uppercase text-outline-variant">{segment.label}</p>
        </div>
      )
    }
    case "on_call":
      return (
        <div className="cursor-pointer rounded-xl border-l-4 border-error bg-error-container/20 p-3 text-on-error-container shadow-sm">
          <p className="text-[10px] font-bold uppercase opacity-70">{segment.timeLabel}</p>
          <p className="truncate text-xs font-bold">{segment.title}</p>
        </div>
      )
  }
}
