import { Card } from "@heroui/react"
import type { LucideIcon } from "lucide-react"
import { AgendaOccupancyChart } from "@/components/charts/agenda-occupancy-chart"

type AgendaOccupancyCardProps = {
  title: string
  icon: LucideIcon
  occupancyPercent: number
  footnote: string
}

export function AgendaOccupancyCard({
  title,
  icon: Icon,
  occupancyPercent,
  footnote,
}: AgendaOccupancyCardProps) {
  return (
    <Card.Root className="space-y-4 rounded-xl bg-surface-container-low p-8">
      <div className="flex items-center justify-between">
        <p className="font-headline font-bold">{title}</p>
        <Icon className="text-primary" />
      </div>
      <div className="pt-2">
        <AgendaOccupancyChart value={occupancyPercent} />
      </div>
      <p className="text-center text-xs leading-relaxed text-on-surface-variant">{footnote}</p>
    </Card.Root>
  )
}
