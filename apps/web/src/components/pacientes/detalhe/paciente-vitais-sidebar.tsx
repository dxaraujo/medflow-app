import { Activity, CheckCircle2, Heart, Scale, Thermometer, TrendingUp } from "lucide-react"
import type { PatientVital } from "@/data/patient-detail-mock"

function pickSidebarVitals(vitals: PatientVital[]): PatientVital[] {
  const by = (sub: string) => vitals.find((v) => v.label.toLowerCase().includes(sub))
  const ordered = [by("pressão"), by("freq"), by("peso")].filter(Boolean) as PatientVital[]
  const used = new Set(ordered.map((v) => v.id))
  const rest = vitals.filter((v) => !used.has(v.id))
  while (ordered.length < 3 && rest.length > 0) {
    ordered.push(rest.shift()!)
  }
  return ordered.slice(0, 3)
}

function vitalIcon(label: string) {
  const l = label.toLowerCase()
  if (l.includes("pressão")) return Heart
  if (l.includes("freq")) return Activity
  if (l.includes("peso")) return Scale
  if (l.includes("temp")) return Thermometer
  return Activity
}

function vitalIconWrapClass(label: string): string {
  const l = label.toLowerCase()
  if (l.includes("pressão")) return "bg-error-container/30 text-error"
  if (l.includes("freq")) return "bg-[#cde5ff]/40 text-primary"
  if (l.includes("peso")) return "bg-secondary-container/40 text-secondary"
  return "bg-surface-container-high text-on-surface-variant"
}

/** Heurística simples: PA com sistólica ≥ 135 → tendência de alerta (como no protótipo). */
function paLooksElevated(v: PatientVital): boolean {
  if (!v.label.toLowerCase().includes("pressão")) return false
  const n = Number.parseInt(v.value, 10)
  return !Number.isNaN(n) && n >= 135
}

type PacienteVitaisSidebarProps = {
  vitals: PatientVital[]
}

export function PacienteVitaisSidebar({ vitals }: PacienteVitaisSidebarProps) {
  const rows = pickSidebarVitals(vitals)

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 bg-surface-container-low rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Sinais Vitais Recentes
        </h3>
        <div className="">
          {rows.map((v) => {
            const Icon = vitalIcon(v.label)
            const wrap = vitalIconWrapClass(v.label)
            const elevated = paLooksElevated(v)
            return (
                <div key={v.id} className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-full ${wrap}`}>
                      <Icon className="size-5 shrink-0" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-on-surface-variant">{v.label}</p>
                      <p className="text-lg font-bold text-on-surface">
                        {v.value}
                        {v.unit ? <span className="text-base font-semibold text-on-surface-variant"> {v.unit}</span> : null}
                      </p>
                    </div>
                  </div>
                  {elevated ? (
                    <TrendingUp className="size-4 shrink-0 text-error" aria-label="Valor elevado" />
                  ) : (
                    <CheckCircle2 className="size-4 shrink-0 text-primary" aria-label="Estável" />
                  )}
                </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
