import { Card } from "@heroui/react"
import { useId, useState } from "react"

const TASKS = [
  { id: "emergencia", label: "Chamadas Emergência" },
  { id: "relatorios", label: "Relatórios Pendentes" },
] as const

export function SaturdayShiftPanel() {
  const baseId = useId()
  const [done, setDone] = useState<Record<string, boolean>>({})

  return (
    <Card.Root className="rounded-xl border border-outline-variant/15 bg-white p-5 shadow-sm dark:bg-slate-900">
      <Card.Header className="mb-3 p-0">
        <Card.Title className="font-headline text-lg font-bold text-primary">Plantão Sábado</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-3 p-0">
        <ul className="space-y-3">
          {TASKS.map((t) => {
            const inputId = `${baseId}-${t.id}`
            const checked = Boolean(done[t.id])
            return (
              <li key={t.id} className="flex items-start gap-3">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setDone((prev) => ({ ...prev, [t.id]: e.target.checked }))}
                  className="mt-1 size-4 shrink-0 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor={inputId} className="cursor-pointer text-sm text-on-surface">
                  {t.label}
                </label>
              </li>
            )
          })}
        </ul>
      </Card.Content>
    </Card.Root>
  )
}
