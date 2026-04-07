import { cn } from "@heroui/react"

export function AgendaLegend() {
  const items = [
    { dotClass: "bg-primary", label: "Retorno" },
    { dotClass: "bg-secondary", label: "Primeira Consulta" },
    { dotClass: "bg-tertiary-container", label: "Procedimento" },
    { dotClass: "bg-error", label: "Urgência" },
  ] as const

  return (
    <div className="fixed bottom-8 left-4 z-40 hidden rounded-full border border-outline-variant/10 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md dark:bg-slate-900/90 md:left-8 md:flex md:items-center md:gap-6 lg:left-72">
      {items.map(({ dotClass, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={cn("size-3 shrink-0 rounded-full", dotClass)} />
          <span className="text-[10px] font-bold uppercase text-on-surface-variant">{label}</span>
        </div>
      ))}
    </div>
  )
}
