type DadosPessoaisFieldProps = {
  label: string
  value: string
  className?: string
}

export function DadosPessoaisField({ label, value, className }: DadosPessoaisFieldProps) {
  return (
    <div className={className}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
    </div>
  )
}
