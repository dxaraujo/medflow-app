import { Card } from "@heroui/react"

type MetricTileProps = {
  label: string
  value: string
  valueClassName: string
}

export function MetricTile({ label, value, valueClassName }: MetricTileProps) {
  return (
    <Card.Root className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className={`font-headline text-xl font-bold ${valueClassName}`}>{value}</p>
    </Card.Root>
  )
}
