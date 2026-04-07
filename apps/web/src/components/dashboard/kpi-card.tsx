import { Card } from "@heroui/react"
import type { ReactNode } from "react"

type KpiCardVariant = "emphasis" | "default"

type KpiCardProps = {
  icon: ReactNode
  value: ReactNode
  label: ReactNode
  footnote?: ReactNode
  variant?: KpiCardVariant
  /** Overrides default value typography (e.g. text-6xl for emphasis). */
  valueClassName?: string
}

const rootByVariant: Record<KpiCardVariant, string> = {
  emphasis:
    "flex aspect-square flex-col justify-between rounded-xl bg-primary-container p-6 text-white md:aspect-auto",
  default:
    "flex aspect-square flex-col justify-between rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 md:aspect-auto",
}

const defaultValueClass: Record<KpiCardVariant, string> = {
  emphasis: "font-headline text-6xl font-bold",
  default: "font-headline text-4xl font-bold text-on-surface",
}

const labelByVariant: Record<KpiCardVariant, string> = {
  emphasis: "text-sm font-medium uppercase tracking-widest opacity-90",
  default: "text-sm font-medium uppercase tracking-widest text-on-surface-variant",
}

export function KpiCard({
  icon,
  value,
  label,
  footnote,
  variant = "default",
  valueClassName,
}: KpiCardProps) {
  const vClass = valueClassName ?? defaultValueClass[variant]

  return (
    <Card.Root className={rootByVariant[variant]}>
      {icon}
      <div>
        <p className={vClass}>{value}</p>
        <p className={labelByVariant[variant]}>{label}</p>
        {footnote ? <div className="mt-1 text-xs font-medium text-green-600">{footnote}</div> : null}
      </div>
    </Card.Root>
  )
}
