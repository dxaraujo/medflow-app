import { Card } from "@heroui/react"
import { useState } from "react"
import { AttendanceBarChart } from "@/components/charts/attendance-bar-chart"
import { AttendanceWeeklyBarChart } from "@/components/charts/attendance-weekly-bar-chart"
import { ChartInsightFooter } from "@/components/dashboard/chart-insight-footer"
import { MetricTile } from "@/components/dashboard/metric-tile"
import { SectionHeader } from "@/components/dashboard/section-header"
import { SegmentedToggle } from "@/components/dashboard/segmented-toggle"
import { WEEKLY_METRIC_TILES } from "@/data/attendance-weekly-series"

const METRIC_TILES = [
  { label: "Total Atendimentos", value: "1.250", valueClassName: "text-primary" },
  { label: "Ausências / Faltas", value: "42", valueClassName: "text-error" },
  { label: "Retornos", value: "312", valueClassName: "text-on-secondary-container" },
  { label: "Novos Pacientes", value: "128", valueClassName: "text-primary-container" },
] as const

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
  const section = SECTION_BY_PERIOD[period]
  const metricTiles = period === "semanal" ? WEEKLY_METRIC_TILES : METRIC_TILES

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
        {period === "historico" ? <AttendanceBarChart /> : <AttendanceWeeklyBarChart />}
        <ChartInsightFooter insight={CHART_INSIGHT_BY_PERIOD[period]} />
      </Card.Root>
    </section>
  )
}
