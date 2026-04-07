export function AppFooter() {
  return (
    <footer className="mx-auto p-12 flex items-center justify-between border-t border-outline-variant/10">
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-emerald-500" />
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          Sistema Operacional • Estável
        </span>
      </div>
      <p className="font-label text-xs text-on-surface-variant">
        © 2023 MedFlow. Todos os direitos reservados.
      </p>
    </footer>
  )
}
