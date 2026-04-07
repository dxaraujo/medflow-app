import { Button } from "@heroui/react"
import type { ReactNode } from "react"

type HeaderIconButtonProps = {
  "aria-label": string
  children: ReactNode
  onPress?: () => void
}

export function HeaderIconButton({ "aria-label": ariaLabel, children, onPress }: HeaderIconButtonProps) {
  return (
    <Button
      variant="ghost"
      isIconOnly
      aria-label={ariaLabel}
      className="text-on-surface-variant opacity-80 hover:opacity-100"
      onPress={onPress}
    >
      {children}
    </Button>
  )
}
