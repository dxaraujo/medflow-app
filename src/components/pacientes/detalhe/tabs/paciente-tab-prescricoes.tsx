import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"

export function PacienteTabPrescricoes() {
  const { prescriptions } = usePatientDetailOutlet()

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <div
        role="tabpanel"
        id="panel-prescricoes"
        aria-labelledby="tab-prescricoes"
        className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8"
      >
        <h3 className="font-headline text-lg font-bold text-on-surface">Prescrições</h3>
        {prescriptions.length === 0 ? (
          <p className="mt-4 font-body text-sm text-on-surface-variant">
            Sem prescrições ativas ou recentes.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  <th className="py-3 pr-4">Medicamento</th>
                  <th className="py-3 pr-4">Dose</th>
                  <th className="py-3 pr-4">Frequência</th>
                  <th className="py-3 pr-4">Início</th>
                  <th className="py-3 pr-4">Fim</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 font-body text-sm">
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 pr-4 font-medium text-on-surface">{p.drug}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{p.dose}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{p.frequency}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{p.start}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{p.end ?? "—"}</td>
                    <td className="py-3 text-on-surface">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
