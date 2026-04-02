import { ProgressBar } from "@heroui/react"

type LabeledProgressRowProps = {
  label: string
  labelClassName: string
  value: number
  ariaLabel: string
  fillClassName: string
}

export function LabeledProgressRow({
  label,
  labelClassName,
  value,
  ariaLabel,
  fillClassName,
}: LabeledProgressRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
        <span className={labelClassName}>{label}</span>
        <span>{value}%</span>
      </div>
      <ProgressBar.Root value={value} aria-label={ariaLabel} className="w-full" color="accent">
        <ProgressBar.Track className="h-2 rounded-full border border-outline-variant/5 bg-white">
          <ProgressBar.Fill className={`rounded-full ${fillClassName}`} />
        </ProgressBar.Track>
      </ProgressBar.Root>
    </div>
  )
}
