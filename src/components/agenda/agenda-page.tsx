import { useState } from "react"
import {
  AGENDA_DEMO_HIGHLIGHT_DAY_INDEX,
  formatAgendaWeekRangePt,
} from "@/data/weekly-agenda-mock"
import { AgendaFab } from "@/components/agenda/agenda-fab"
import { AgendaLegend } from "@/components/agenda/agenda-legend"
import type { AgendaViewMode } from "@/components/agenda/agenda-week-header"
import { AgendaWeekHeader } from "@/components/agenda/agenda-week-header"
import { AgendaWeeklyGrid } from "@/components/agenda/agenda-weekly-grid"

export function AgendaPage() {
  const [view, setView] = useState<AgendaViewMode>("semana")

  return (
    <>
      <section className="w-full flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[1600px]">
          <AgendaWeekHeader
            weekRangeLabel={formatAgendaWeekRangePt()}
            view={view}
            onViewChange={setView}
          />
          {view === "semana" ? (
            <AgendaWeeklyGrid highlightDayIndex={AGENDA_DEMO_HIGHLIGHT_DAY_INDEX} />
          ) : (
            <div className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low/50 py-24 text-center">
              <p className="text-on-surface-variant">
                Vista {view === "mes" ? "mensal" : "do dia"} em breve.
              </p>
            </div>
          )}
        </div>
      </section>
      <AgendaLegend />
      <AgendaFab />
    </>
  )
}
