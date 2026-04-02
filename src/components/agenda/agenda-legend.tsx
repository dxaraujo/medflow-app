export function AgendaLegend() {
  const items = [
    { label: "Retorno", className: "bg-primary" },
    { label: "Primeira consulta", className: "bg-sky-200" },
    { label: "Procedimento", className: "bg-agenda-procedure" },
    { label: "Urgência", className: "border-2 border-error bg-white" },
  ] as const

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`size-3 shrink-0 rounded-sm ${item.className}`} aria-hidden />
          <span className="text-sm text-on-surface-variant">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
