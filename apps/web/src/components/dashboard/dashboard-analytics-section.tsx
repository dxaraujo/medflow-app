import { Card } from "@heroui/react"
import { useEffect, useState } from "react"
import { AttendanceBarChart } from "@/components/charts/attendance-bar-chart"
import { AttendanceWeeklyBarChart } from "@/components/charts/attendance-weekly-bar-chart"
import { ChartInsightFooter } from "@/components/dashboard/chart-insight-footer"
import { MetricTile } from "@/components/dashboard/metric-tile"
import { SectionHeader } from "@/components/dashboard/section-header"
import { SegmentedToggle } from "@/components/dashboard/segmented-toggle"
import type { AttendanceMonthPoint } from "@/data/attendance-series"
import type { AttendanceWeekDayPoint } from "@/data/attendance-weekly-series"
import { fetchDashboardAttendance } from "@/lib/api"

const PERIOD_OPTIONS = [
  { id: "semanal" as const, label: "Semanal" },
  { id: "historico" as const, label: "Histórico" },
]

const SECTION_BY_PERIOD = {
  historico: {
    title: "Histórico Anual de Atendimentos",
    description: "Análise consolidada da performance clínica no ano corrente.",
  },
  semanal: {
    title: "Atendimentos na Semana",
    description: "Distribuição relativa da ocupação por dia útil e fim de semana.",
  },
} as const

const CHART_INSIGHT_BY_PERIOD = {
  historico:
    "Tendência de crescimento estável com pico sazonal identificado em Julho. Projeção de alta para o próximo trimestre baseada no histórico de retornos.",
  semanal:
    "Pico de demanda na quarta-feira; sábado com volume reduzido e domingo sem agenda. Considere reforçar slots nas terças para equilibrar a carga.",
} as const

export type DashboardPeriod = (typeof PERIOD_OPTIONS)[number]["id"]

export function DashboardAnalyticsSection() {
  const [period, setPeriod] = useState<DashboardPeriod>("semanal")
  const [monthly, setMonthly] = useState<AttendanceMonthPoint[]>([])
  const [weekly, setWeekly] = useState<AttendanceWeekDayPoint[]>([])
  const [tilesSemanal, setTilesSemanal] = useState<
    { label: string; value: string; valueClassName: string }[]
  >([])
  const [tilesHistorico, setTilesHistorico] = useState<
    { label: string; value: string; valueClassName: string }[]
  >([])
  const [dashError, setDashError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchDashboardAttendance()
      .then((d) => {
        if (cancelled) return
        setMonthly(d.monthly)
        setWeekly(d.weekly)
        setTilesSemanal([...d.tilesSemanal])
        setTilesHistorico([...d.tilesHistorico])
        setDashError(null)
      })
      .catch((e: unknown) => {
        if (!cancelled) setDashError(e instanceof Error ? e.message : "Falha ao carregar indicadores")
      })
    return () => {
      cancelled = true
    }
  }, [])

  const section = SECTION_BY_PERIOD[period]
  const metricTiles = period === "semanal" ? tilesSemanal : tilesHistorico

  if (dashError) {
    return (
      <section className="space-y-8 lg:col-span-2">
        <p className="rounded-xl border border-error/30 bg-error/5 p-6 font-body text-error">{dashError}</p>
      </section>
    )
  }

  if (monthly.length === 0 || weekly.length === 0) {
    return (
      <section className="space-y-8 lg:col-span-2">
        <p className="font-body text-on-surface-variant">Carregando indicadores…</p>
      </section>
    )
  }

  return (
    <section className="space-y-8 lg:col-span-2">
      <SegmentedToggle value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />

      <SectionHeader title={section.title} description={section.description} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metricTiles.map((m) => (
          <MetricTile key={m.label} label={m.label} value={m.value} valueClassName={m.valueClassName} />
        ))}
      </div>

      <Card.Root className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
        {period === "historico" ? (
          <AttendanceBarChart data={monthly} />
        ) : (
          <AttendanceWeeklyBarChart data={weekly} />
        )}
        <ChartInsightFooter insight={CHART_INSIGHT_BY_PERIOD[period]} />
      </Card.Root>
    </section>
  )
}
