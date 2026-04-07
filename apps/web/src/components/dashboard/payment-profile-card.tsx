import { Card } from "@heroui/react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { LabeledProgressRow } from "@/components/dashboard/labeled-progress-row"

type PaymentSplit = {
  label: string
  labelClassName: string
  value: number
  ariaLabel: string
  fillClassName: string
}

type PaymentProfileCardProps = {
  title: string
  icon: LucideIcon
  splits: readonly PaymentSplit[]
  footnote: ReactNode
}

export function PaymentProfileCard({ title, icon: Icon, splits, footnote }: PaymentProfileCardProps) {
  return (
    <Card.Root className="space-y-6 rounded-xl bg-surface-container-low p-8">
      <div className="flex items-center justify-between">
        <p className="font-headline font-bold">{title}</p>
        <Icon className="text-on-surface-variant" />
      </div>
      <div className="space-y-4">
        {splits.map((s) => (
          <LabeledProgressRow
            key={s.label}
            label={s.label}
            labelClassName={s.labelClassName}
            value={s.value}
            ariaLabel={s.ariaLabel}
            fillClassName={s.fillClassName}
          />
        ))}
      </div>
      <div className="border-t border-outline-variant/10 pt-4">
        <p className="text-xs leading-relaxed text-on-surface-variant">{footnote}</p>
      </div>
    </Card.Root>
  )
}
