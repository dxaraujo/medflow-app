import { Button, cn } from "@heroui/react"

export type SegmentedOption<T extends string> = {
  id: T
  label: string
}

type SegmentedToggleProps<T extends string> = {
  value: T
  onChange: (next: T) => void
  options: readonly SegmentedOption<T>[]
  className?: string
}

export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
  className,
}: SegmentedToggleProps<T>) {
  return (
    <div
      className={cn(
        "mb-6 flex w-fit items-center gap-1 rounded-full border border-outline-variant/10 bg-surface-container-low p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.id
        return (
          <Button
            key={opt.id}
            variant={selected ? "primary" : "ghost"}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-semibold",
              selected && "shadow-sm",
            )}
            onPress={() => onChange(opt.id)}
          >
            {opt.label}
          </Button>
        )
      })}
    </div>
  )
}
