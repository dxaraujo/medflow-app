import type { PatientDetail, PatientDetailTabId } from "@/data/patient-detail-mock"
import { PacienteEvolucaoEditor } from "./paciente-evolucao-editor"
import { PacienteQuickActions } from "./paciente-quick-actions"
import { PacienteTimeline } from "./paciente-timeline"
import { PacienteVitaisSidebar } from "./paciente-vitais-sidebar"
import { PacienteAlertasChips } from "./paciente-alertas-chips"
import { Fragment } from "react/jsx-runtime"

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

type PacienteDetalhePainelProps = {
  tab: PatientDetailTabId
  detail: PatientDetail
}

export function PacienteDetalhePainel({ tab, detail }: PacienteDetalhePainelProps) {
  const { hero, timelineEvents, personal, consults, prescriptions, exams } = detail

  const rows: { label: string; value: string }[] = [
    { label: "Data de nascimento", value: personal.birthDate },
    { label: "CPF", value: personal.cpfMasked },
    { label: "E-mail", value: personal.email },
    { label: "Endereço", value: personal.address },
    { label: "Convênio", value: personal.insurance },
    { label: "Contato de emergência", value: personal.emergencyContact },
    { label: "Telefone emergência", value: personal.emergencyPhone },
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      {tab === "evolucao" ? (
        <Fragment key="evolucao">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col gap-6">
              <PacienteVitaisSidebar vitals={detail.vitals} />
              <PacienteAlertasChips allergies={detail.allergies} alerts={detail.alerts} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <PacienteEvolucaoEditor hero={hero} />
                <div className="flex min-h-0 flex-col gap-6">
                  <PacienteQuickActions />
                  <PacienteTimeline events={timelineEvents} layout="bento" />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : null
      }
      {
        tab === "dados_pessoais" ? (
          <div className="flex flex-col gap-6 col-span-12">
            <div role="tabpanel" id="panel-dados_pessoais" aria-labelledby="tab-dados_pessoais" className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8">
              <h3 className="font-headline text-lg font-bold text-on-surface">Dados pessoais</h3>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {rows.map((r) => (
                  <div key={r.label} className="border-b border-outline-variant/10 pb-4 sm:border-none sm:pb-0">
                    <dt className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                      {r.label}
                    </dt>
                    <dd className="mt-1 font-body text-sm text-on-surface">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ) : null
      }
      {
        tab === "historico" ? (
          <div className="flex flex-col gap-6 col-span-12">
            <div role="tabpanel" id="panel-historico" aria-labelledby="tab-historico" className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8">
              <h3 className="font-headline text-lg font-bold text-on-surface">Histórico de consultas</h3>
              {consults.length === 0 ? (
                <p className="mt-4 font-body text-sm text-on-surface-variant">Sem consultas registradas.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        <th className="py-3 pr-4">Data</th>
                        <th className="py-3 pr-4">Profissional</th>
                        <th className="py-3 pr-4">Motivo</th>
                        <th className="py-3">Resumo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 font-body text-sm text-on-surface">
                      {consults.map((c) => (
                        <tr key={c.id}>
                          <td className="py-3 pr-4 text-on-surface-variant">{c.date}</td>
                          <td className="py-3 pr-4">{c.professional}</td>
                          <td className="py-3 pr-4">{c.reason}</td>
                          <td className="py-3 text-on-surface-variant">{c.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null
      }
      {
        tab === "prescricoes" ? (
          <div className="flex flex-col gap-6 col-span-12">
            <div role="tabpanel" id="panel-prescricoes" aria-labelledby="tab-prescricoes" className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8">
              <h3 className="font-headline text-lg font-bold text-on-surface">Prescrições</h3>
              {prescriptions.length === 0 ? (
                <p className="mt-4 font-body text-sm text-on-surface-variant">Sem prescrições ativas ou recentes.</p>
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
        ) : null
      }
      {
        tab === "exames" ? (
          <div className="flex flex-col gap-6 col-span-12">
            <div role="tabpanel" id="panel-exames" aria-labelledby="tab-exames" className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8" >
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
        ) : null
      }
    </div >
  )
}
