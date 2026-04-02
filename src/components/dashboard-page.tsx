import { Card } from "@heroui/react"
import { Armchair, CalendarCheck, Clock, PieChart, UserPlus } from "lucide-react"
import { useState } from "react"
import { AgendaOccupancyCard } from "@/components/dashboard/agenda-occupancy-card"
import { ChartInsightFooter } from "@/components/dashboard/chart-insight-footer"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { MetricTile } from "@/components/dashboard/metric-tile"
import { PageHero } from "@/components/dashboard/page-hero"
import { PaymentProfileCard } from "@/components/dashboard/payment-profile-card"
import { SectionHeader } from "@/components/dashboard/section-header"
import { SegmentedToggle } from "@/components/dashboard/segmented-toggle"
import { AttendanceBarChart } from "@/components/charts/attendance-bar-chart"

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

const PAYMENT_SPLITS = [
  {
    label: "Particulares",
    labelClassName: "text-primary",
    value: 68,
    ariaLabel: "Particulares 68 por cento",
    fillClassName: "bg-primary",
  },
  {
    label: "Convênios",
    labelClassName: "text-on-secondary-container",
    value: 32,
    ariaLabel: "Convênios 32 por cento",
    fillClassName: "bg-on-secondary-container",
  },
] as const

export function DashboardPage() {
  const [period, setPeriod] = useState<"semanal" | "historico">("historico")

  return (
    <div className="mx-auto max-w-7xl space-y-12 p-12">
      <PageHero
        title="Painel de Gestão"
        subtitle="Visão estratégica da performance e produtividade da clínica."
      />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          variant="emphasis"
          icon={<CalendarCheck className="size-10" />}
          value="12"
          label="Consultas Hoje"
        />
        <KpiCard
          icon={<UserPlus className="size-10 text-primary" />}
          value="42"
          label="Novos Pacientes / Mês"
          footnote="+15% vs mês anterior"
        />
        <KpiCard
          icon={<Clock className="size-10 text-primary" />}
          value={
            <>
              14<span className="ml-1 text-2xl">min</span>
            </>
          }
          label="Tempo Médio de Espera"
          footnote="Meta: < 15 min"
        />
      </section>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <SegmentedToggle value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />

          <SectionHeader
            title="Histórico Anual de Atendimentos"
            description="Análise consolidada da performance clínica no ano corrente."
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {METRIC_TILES.map((m) => (
              <MetricTile key={m.label} label={m.label} value={m.value} valueClassName={m.valueClassName} />
            ))}
          </div>

          <Card.Root className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
            <AttendanceBarChart />
            <ChartInsightFooter
              insight="Tendência de crescimento estável com pico sazonal identificado em Julho. Projeção de alta para o próximo trimestre baseada no histórico de retornos."
            />
          </Card.Root>
        </section>

        <aside className="space-y-8">
          <h3 className="font-headline text-2xl font-bold">Visão Geral</h3>

          <AgendaOccupancyCard
            title="Ocupação da Agenda"
            icon={Armchair}
            occupancyPercent={88}
            footnote="Sua agenda desta semana está quase completa. 4 slots restantes."
          />

          <PaymentProfileCard
            title="Perfil de Pagamento"
            icon={PieChart}
            splits={PAYMENT_SPLITS}
            footnote={
              <>
                Aumento de <strong>3%</strong> na taxa de pacientes particulares em relação ao período
                anterior.
              </>
            }
          />
        </aside>
      </div>
    </div>
  )
}
