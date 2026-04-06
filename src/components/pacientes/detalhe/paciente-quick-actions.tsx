import { FlaskConical, Pill } from "lucide-react"

export function PacienteQuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="group flex flex-col items-center gap-3 rounded-2xl bg-[#cde5ff]/40 p-6 text-center transition-colors hover:bg-[#cde5ff]/60"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
          <Pill className="size-6 text-primary" aria-hidden />
        </div>
        <span className="text-sm font-bold text-[#004a75]">Nova prescrição</span>
      </button>
      <button
        type="button"
        className="group flex flex-col items-center gap-3 rounded-2xl bg-[#cde6f9]/40 p-6 text-center transition-colors hover:bg-[#cde6f9]/60"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
          <FlaskConical className="size-6 text-secondary" aria-hidden />
        </div>
        <span className="text-sm font-bold text-on-secondary-container">Solicitar exames</span>
      </button>
    </div>
  )
}
