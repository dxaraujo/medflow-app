import { Armchair, PieChart } from "lucide-react"
import { AgendaOccupancyCard } from "@/components/dashboard/agenda-occupancy-card"
import { PaymentProfileCard } from "@/components/dashboard/payment-profile-card"

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

export function DashboardOverviewAside() {
  return (
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
  )
}
