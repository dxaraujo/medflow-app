import type { PatientAlert, PatientAllergy } from "@/data/patient-detail-mock"

type PacienteAlertasChipsProps = {
  allergies: PatientAllergy[]
  alerts: PatientAlert[]
}

export function PacienteAlertasChips({ allergies, alerts }: PacienteAlertasChipsProps) {
  const hasAny = allergies.length > 0 || alerts.length > 0

  if (!hasAny) {
    return (
      <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
        <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Alergias e alertas
        </h3>
        <p className="mt-3 font-body text-sm text-on-surface-variant">
          Nenhum registro crítico para exibir.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-error/10 bg-error-container/20 p-6">
      <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-error-container">
        Alergias e alertas
      </h3>
      <div className="mt-4 flex flex-wrap gap-2" role="list">
        {allergies.map((a) => (
          <span
            key={a.id}
            role="listitem"
            className="rounded-full bg-error-container px-3 py-1 font-body text-xs font-semibold text-on-error-container"
          >
            Alergia: {a.substance}
          </span>
        ))}
        {alerts.map((al) => (
          <span
            key={al.id}
            role="listitem"
            className="rounded-full bg-tertiary-container/15 px-3 py-1 font-body text-xs font-semibold text-on-error-container"
          >
            Alerta: {al.title}
          </span>
        ))}
      </div>
    </div>
  )
}
