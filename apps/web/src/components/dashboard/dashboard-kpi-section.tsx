import { CalendarCheck, Clock, UserPlus } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"

export function DashboardKpiSection() {
  return (
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
  )
}
