import { cn } from "@heroui/react"
import type { AgendaWeekSegment } from "@/types/agenda"
import { AgendaSegment } from "@/components/agenda/agenda-segment"

type AgendaDayColumnProps = {
  weekday: string
  dayOfMonth: number
  segments: AgendaWeekSegment[]
  highlighted: boolean
}

export function AgendaDayColumn({
  weekday,
  dayOfMonth,
  segments,
  highlighted,
}: AgendaDayColumnProps) {
  return (
    <div className="space-y-4">
      <div className="py-2 text-center">
        <p
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            highlighted ? "text-primary" : "text-on-surface-variant",
          )}
        >
          {weekday}
        </p>
        <p className={cn("font-headline text-xl font-bold", highlighted && "text-primary")}>
          {dayOfMonth}
        </p>
      </div>
      <div
        className={cn(
          "flex min-h-[600px] flex-col gap-2 rounded-xl bg-surface-container-low p-2",
          highlighted && "ring-2 ring-primary/10",
        )}
      >
        {segments.map((seg) => (
          <AgendaSegment key={seg.id} segment={seg} />
        ))}
      </div>
    </div>
  )
}
