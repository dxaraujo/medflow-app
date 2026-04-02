import { Link } from "@heroui/react"
import { Download } from "lucide-react"
import type { ReactNode } from "react"

type ChartInsightFooterProps = {
  insight: string
  exportHref?: string
  exportLabel?: string
  /** Extra actions beside the default export link. */
  actions?: ReactNode
}

export function ChartInsightFooter({
  insight,
  exportHref = "#",
  exportLabel = "Exportar Relatório",
  actions,
}: ChartInsightFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-outline-variant/10 pt-6">
      <p className="max-w-md text-xs leading-relaxed text-on-surface-variant">{insight}</p>
      <div className="flex items-center gap-4">
        {actions}
        <Link.Root
          href={exportHref}
          className="inline-flex items-center gap-1 text-sm font-bold text-primary no-underline hover:underline"
        >
          <Download className="size-4" />
          {exportLabel}
        </Link.Root>
      </div>
    </div>
  )
}
