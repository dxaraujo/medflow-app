import { DEFAULT_AGENDA_WEEK_START, fetchAgendaWeek, weekStartToAnchorLocal } from "@/lib/api"
import { useEffect, useState } from "react"
import type { AgendaDayIndex, AgendaWeekColumn } from "@/types/agenda"
import { AgendaFab } from "@/components/agenda/agenda-fab"
import { AgendaLegend } from "@/components/agenda/agenda-legend"
import type { AgendaViewMode } from "@/components/agenda/agenda-week-header"
import { AgendaWeekHeader } from "@/components/agenda/agenda-week-header"
import { AgendaWeeklyGrid } from "@/components/agenda/agenda-weekly-grid"

export function AgendaPage() {
  const [view, setView] = useState<AgendaViewMode>("semana")
  const [weekRangeLabel, setWeekRangeLabel] = useState("")
  const [highlightDayIndex, setHighlightDayIndex] = useState<AgendaDayIndex>(0)
  const [columns, setColumns] = useState<AgendaWeekColumn[]>([])
  const [weekAnchor, setWeekAnchor] = useState(() => weekStartToAnchorLocal(DEFAULT_AGENDA_WEEK_START))
  const [agendaError, setAgendaError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchAgendaWeek(DEFAULT_AGENDA_WEEK_START)
      .then((w) => {
        if (cancelled || !w) {
          if (!cancelled && !w) setAgendaError("Semana não encontrada na API. Execute o seed do banco.")
          return
        }
        setWeekRangeLabel(w.weekRangeLabel)
        setHighlightDayIndex(w.highlightDayIndex as AgendaDayIndex)
        setColumns(w.columns)
        setWeekAnchor(weekStartToAnchorLocal(w.weekStart))
        setAgendaError(null)
      })
      .catch((e: unknown) => {
        if (!cancelled) setAgendaError(e instanceof Error ? e.message : "Falha ao carregar agenda")
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="w-full flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[1600px]">
          <AgendaWeekHeader
            weekRangeLabel={weekRangeLabel || "…"}
            view={view}
            onViewChange={setView}
          />
          {agendaError ? (
            <p className="mt-8 rounded-xl border border-error/30 bg-error/5 p-6 font-body text-error">{agendaError}</p>
          ) : null}
          {view === "semana" && columns.length > 0 ? (
            <AgendaWeeklyGrid
              highlightDayIndex={highlightDayIndex}
              weekAnchor={weekAnchor}
              columns={columns}
            />
          ) : null}
          {view === "semana" && !agendaError && columns.length === 0 ? (
            <p className="mt-8 font-body text-on-surface-variant">Carregando agenda…</p>
          ) : null}
          {view !== "semana" ? (
            <div className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low/50 py-24 text-center">
              <p className="text-on-surface-variant">
                Vista {view === "mes" ? "mensal" : "do dia"} em breve.
              </p>
            </div>
          ) : null}
        </div>
      </section>
      <AgendaLegend />
      <AgendaFab />
    </>
  )
}
