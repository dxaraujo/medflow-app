import type { AgendaDayIndex, AgendaWeekColumn, AgendaWeekSegment } from "@/types/agenda"
import { getAgendaWeekDayLabels } from "@/data/weekly-agenda-mock"
import { AgendaDayColumn } from "@/components/agenda/agenda-day-column"

const HOUR_LABELS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]

type AgendaWeeklyGridProps = {
  highlightDayIndex: AgendaDayIndex
  weekAnchor: Date
  columns: AgendaWeekColumn[]
}

function segmentsForDay(dayIndex: AgendaDayIndex, columns: AgendaWeekColumn[]): AgendaWeekSegment[] {
  const col = columns.find((c) => c.dayIndex === dayIndex)
  return col?.segments ?? []
}

export function AgendaWeeklyGrid({ highlightDayIndex, weekAnchor, columns }: AgendaWeeklyGridProps) {
  const days = getAgendaWeekDayLabels(weekAnchor)

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[60px_repeat(7,1fr)]">
      <div className="hidden flex-col gap-12 pt-16 pr-4 text-right text-[10px] font-bold uppercase tracking-widest text-on-surface-variant xl:flex">
        {HOUR_LABELS.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      {days.map(({ dayIndex, weekday, dayOfMonth }) => (
        <AgendaDayColumn
          key={dayIndex}
          weekday={weekday}
          dayOfMonth={dayOfMonth}
          segments={segmentsForDay(dayIndex, columns)}
          highlighted={dayIndex === highlightDayIndex}
        />
      ))}
    </div>
  )
}
