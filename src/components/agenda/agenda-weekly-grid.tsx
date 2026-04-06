import type { AgendaDayIndex } from "@/types/agenda"
import { getAgendaWeekDayLabels, getSegmentsForDay } from "@/data/weekly-agenda-mock"
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
}

export function AgendaWeeklyGrid({ highlightDayIndex }: AgendaWeeklyGridProps) {
  const days = getAgendaWeekDayLabels()

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
          segments={getSegmentsForDay(dayIndex)}
          highlighted={dayIndex === highlightDayIndex}
        />
      ))}
    </div>
  )
}
