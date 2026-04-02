import { Calendar } from "lucide-react"
import { useMemo, useState } from "react"
import { AgendaDecorativeCard } from "@/components/agenda/agenda-decorative-card"
import { AgendaLegend } from "@/components/agenda/agenda-legend"
import { NewAppointmentFab } from "@/components/agenda/new-appointment-fab"
import { SaturdayShiftPanel } from "@/components/agenda/saturday-shift-panel"
import type { DayHeader } from "@/components/agenda/weekly-calendar-grid"
import { WeeklyCalendarGrid } from "@/components/agenda/weekly-calendar-grid"
import { SegmentedToggle } from "@/components/dashboard/segmented-toggle"
import {
  AGENDA_WEEK_ANCHOR,
  weeklyAgendaAppointments,
  weeklyAgendaBlockedSpans,
  weeklyAgendaLunchMarkers,
} from "@/data/weekly-agenda-mock"

const WEEKDAY_TITLES = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA"] as const

const VIEW_OPTIONS = [
  { id: "semana" as const, label: "Semana" },
  { id: "mes" as const, label: "Mês" },
  { id: "dia" as const, label: "Dia" },
]

function addDays(base: Date, days: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

function formatWeekRangeLabel(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6)
  const year = weekStart.getFullYear()
  const fmt = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" })
  const a = fmt.format(weekStart)
  const b = fmt.format(weekEnd)
  return `${a} – ${b}, ${year}`
}

function buildDayHeaders(weekStart: Date): DayHeader[] {
  const headers: DayHeader[] = []
  for (let i = 0; i < 5; i += 1) {
    const d = addDays(weekStart, i)
    headers.push({
      key: `d-${i}`,
      weekday: WEEKDAY_TITLES[i],
      dayNum: String(d.getDate()),
    })
  }
  const sat = addDays(weekStart, 5)
  const sun = addDays(weekStart, 6)
  headers.push({
    key: "weekend",
    weekday: "FIM DE SEMANA",
    dayNum: `${sat.getDate()}–${sun.getDate()}`,
  })
  return headers
}

export function AgendaPage() {
  const [view, setView] = useState<"semana" | "mes" | "dia">("semana")

  const dayHeaders = useMemo(() => buildDayHeaders(AGENDA_WEEK_ANCHOR), [])
  const rangeLabel = useMemo(() => formatWeekRangeLabel(AGENDA_WEEK_ANCHOR), [])

  return (
    <div className="relative mx-auto max-w-7xl space-y-8 p-12 pb-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <section className="space-y-2">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Agenda Semanal</h1>
          <p className="flex items-center gap-2 text-lg text-on-surface-variant">
            <Calendar className="size-5 shrink-0 text-primary" aria-hidden />
            <span>{rangeLabel}</span>
          </p>
        </section>
        <SegmentedToggle
          value={view}
          onChange={setView}
          options={VIEW_OPTIONS}
          className="mb-0 shrink-0"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          {view === "semana" ? (
            <WeeklyCalendarGrid
              dayHeaders={dayHeaders}
              appointments={weeklyAgendaAppointments}
              blockedSpans={weeklyAgendaBlockedSpans}
              lunchMarkers={weeklyAgendaLunchMarkers}
            />
          ) : (
            <p className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low/50 p-8 text-center text-on-surface-variant">
              Vista {view === "mes" ? "mensal" : "do dia"} em breve.
            </p>
          )}
          <AgendaLegend />
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          <SaturdayShiftPanel />
          <AgendaDecorativeCard />
        </aside>
      </div>

      <NewAppointmentFab />
    </div>
  )
}
