import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"

const EXAM_BADGE: Record<string, string> = {
  realizado: "bg-emerald-100 text-emerald-800",
  pendente: "bg-amber-100 text-amber-800",
  solicitado: "bg-secondary-container text-on-secondary-container",
}

const EXAM_LABEL: Record<string, string> = {
  realizado: "Realizado",
  pendente: "Pendente",
  solicitado: "Solicitado",
}

export function PacienteTabExames() {
  const { exams } = usePatientDetailOutlet()

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <div
        role="tabpanel"
        id="panel-exames"
        aria-labelledby="tab-exames"
        className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8"
      >
        <h3 className="font-headline text-lg font-bold text-on-surface">Exames</h3>
        {exams.length === 0 ? (
          <p className="mt-4 font-body text-sm text-on-surface-variant">Sem exames registrados.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {exams.map((x) => (
              <li
                key={x.id}
                className="flex flex-col gap-2 rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-headline font-semibold text-on-surface">{x.name}</p>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">{x.date}</p>
                  <p className="mt-2 font-body text-sm text-on-surface-variant">{x.resultSummary}</p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter ${EXAM_BADGE[x.status]}`}
                >
                  {EXAM_LABEL[x.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
