import { cn } from "@heroui/react"
import type { AgendaBlockedSpan } from "@/types/agenda"
import { AGENDA_START_HOUR, agendaTotalHours } from "@/components/agenda/agenda-constants"

type BlockedTimeSpanProps = {
  block: AgendaBlockedSpan
  className?: string
}

export function BlockedTimeSpan({ block, className }: BlockedTimeSpanProps) {
  const { startHour, durationHours, label } = block
  const total = agendaTotalHours()
  const topPct = ((startHour - AGENDA_START_HOUR) / total) * 100
  const heightPct = (durationHours / total) * 100

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1 right-1 z-[5] flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-low/90 px-2 py-1 text-center text-xs font-headline font-bold uppercase tracking-wide text-on-surface-variant",
        className,
      )}
      style={{
        top: `${topPct}%`,
        height: `${heightPct}%`,
      }}
    >
      {label}
    </div>
  )
}
