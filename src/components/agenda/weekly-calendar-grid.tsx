import { UtensilsCrossed } from "lucide-react"
import { AppointmentBlock } from "@/components/agenda/appointment-block"
import { BlockedTimeSpan } from "@/components/agenda/blocked-time-span"
import {
  AGENDA_HOUR_HEIGHT_REM,
  AGENDA_START_HOUR,
  agendaHourSlots,
  agendaTotalHours,
} from "@/components/agenda/agenda-constants"
import type { AgendaAppointment, AgendaBlockedSpan, AgendaLunchMarker } from "@/types/agenda"

export type DayHeader = {
  key: string
  weekday: string
  dayNum: string
  sub?: string
}

type WeeklyCalendarGridProps = {
  dayHeaders: DayHeader[]
  appointments: AgendaAppointment[]
  blockedSpans: AgendaBlockedSpan[]
  lunchMarkers: AgendaLunchMarker[]
}

function formatHourLabel(h: number): string {
  return `${String(h).padStart(2, "0")}:00`
}

export function WeeklyCalendarGrid({
  dayHeaders,
  appointments,
  blockedSpans,
  lunchMarkers,
}: WeeklyCalendarGridProps) {
  const hours = agendaHourSlots()
  const totalH = agendaTotalHours()
  const columnHeightRem = totalH * AGENDA_HOUR_HEIGHT_REM

  return (
    <div
      className="w-full min-w-[720px] overflow-x-auto rounded-xl border border-outline-variant/20 bg-white shadow-sm dark:bg-slate-950"
      role="region"
      aria-label="Agenda semanal"
    >
      <div className="flex">
        {/* Canto + alinhamento com colunas de dia */}
        <div
          className="flex w-14 shrink-0 flex-col border-r border-outline-variant/20 bg-surface-container-low/50"
          style={{ minHeight: `${columnHeightRem + 2.75}rem` }}
        >
          <div className="flex h-11 shrink-0 items-end border-b border-outline-variant/20 pb-1" />
          {hours.map((h) => (
            <div
              key={h}
              className="flex shrink-0 items-start justify-end border-b border-outline-variant/15 pr-2 pt-1 text-[11px] font-medium tabular-nums text-on-surface-variant"
              style={{ height: `${AGENDA_HOUR_HEIGHT_REM}rem` }}
            >
              {formatHourLabel(h)}
            </div>
          ))}
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-6">
          {dayHeaders.map((day, dayIndex) => (
            <div
              key={day.key}
              className="border-l border-outline-variant/20 first:border-l-0"
            >
              <header
                role="columnheader"
                className="flex h-11 flex-col items-center justify-center border-b border-outline-variant/20 bg-surface-container-low/30 px-1 text-center"
              >
                <span className="font-headline text-[10px] font-bold uppercase leading-tight text-primary">
                  {day.weekday}
                </span>
                <span className="text-xs font-semibold text-on-surface">{day.dayNum}</span>
                {day.sub ? (
                  <span className="text-[10px] text-on-surface-variant">{day.sub}</span>
                ) : null}
              </header>
              <div
                className="relative"
                style={{ height: `${columnHeightRem}rem` }}
              >
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-b border-outline-variant/15"
                    style={{
                      top: `${((h - AGENDA_START_HOUR) / totalH) * 100}%`,
                      height: `${(1 / totalH) * 100}%`,
                    }}
                  />
                ))}

                {lunchMarkers
                  .filter((m) => m.dayColumn === dayIndex)
                  .map((m) => (
                    <div
                      key={`lunch-${m.dayColumn}-${m.hour}`}
                      className="pointer-events-none absolute left-0 right-0 z-[4] flex items-center justify-center"
                      style={{
                        top: `${((m.hour - AGENDA_START_HOUR) / totalH) * 100}%`,
                        height: `${(1 / totalH) * 100}%`,
                      }}
                    >
                      <UtensilsCrossed
                        className="size-5 text-on-surface-variant/50"
                        aria-hidden
                      />
                      <span className="sr-only">Intervalo de almoço às {formatHourLabel(m.hour)}</span>
                    </div>
                  ))}

                {blockedSpans
                  .filter((b) => b.dayColumn === dayIndex)
                  .map((b) => (
                    <BlockedTimeSpan key={b.id} block={b} />
                  ))}

                {appointments
                  .filter((a) => a.dayColumn === dayIndex)
                  .map((a) => (
                    <AppointmentBlock key={a.id} appointment={a} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
