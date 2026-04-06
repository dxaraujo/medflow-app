import type { PatientDetail, PatientDetailTabId } from "@/data/patient-detail-mock"
import { Contact, LocateFixed, ShieldCheck, UserRound } from "lucide-react"
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

type DadosPessoaisFieldProps = {
  label: string
  value: string
  className?: string
}

function DadosPessoaisField({ label, value, className }: DadosPessoaisFieldProps) {
  return (
    <div className={className}>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-slate-800 font-bold text-lg">{value}</p>
    </div>
  )
}

export function PacienteDetalhePainel({ tab, detail }: PacienteDetalhePainelProps) {
  const { hero, timelineEvents, personal, consults, prescriptions, exams } = detail

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
            <div
              role="tabpanel"
              id="panel-dados_pessoais"
              aria-labelledby="tab-dados_pessoais"
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <UserRound className="size-5" aria-hidden />
                  <h3 className="font-headline text-lg font-bold text-primary">Informações Básicas</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <DadosPessoaisField label="Nome Completo" value={personal.fullName} />
                  <DadosPessoaisField label="CPF" value={personal.cpf} />
                  <DadosPessoaisField label="Data de Nascimento" value={personal.birthDate} />
                  <DadosPessoaisField label="Gênero" value={personal.gender} />
                  <DadosPessoaisField label="Nome da Mãe" value={personal.motherName} className="md:col-span-2" />
                </div>
              </section>

              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <Contact className="size-5" aria-hidden />
                  <h3 className="font-headline text-lg font-bold text-primary">Contato</h3>
                </div>
                <div className="space-y-4">
                  <DadosPessoaisField label="Email" value={personal.email} />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DadosPessoaisField label="Telefone (WhatsApp)" value={personal.whatsappPhone} />
                    <DadosPessoaisField
                      label="Contato de Emergência"
                      value={`${personal.emergencyContact} - ${personal.emergencyPhone}`}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <LocateFixed className="size-5" aria-hidden />
                  <h3 className="font-headline text-lg font-bold text-primary">Endereço Completo</h3>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <DadosPessoaisField label="Logradouro" value={personal.address.street} className="col-span-4" />
                  <DadosPessoaisField label="Número" value={personal.address.number} className="col-span-2" />
                  <DadosPessoaisField
                    label="Complemento"
                    value={personal.address.complement}
                    className="col-span-3"
                  />
                  <DadosPessoaisField label="Bairro" value={personal.address.district} className="col-span-3" />
                  <DadosPessoaisField label="Cidade" value={personal.address.city} className="col-span-2" />
                  <DadosPessoaisField label="Estado" value={personal.address.state} className="col-span-2" />
                  <DadosPessoaisField label="CEP" value={personal.address.zipCode} className="col-span-2" />
                </div>
              </section>

              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 text-primary">
                  <ShieldCheck className="size-5" aria-hidden />
                  <h3 className="font-headline text-lg font-bold text-primary">Convênio / Plano de Saúde</h3>
                </div>
                <div className="rounded-lg border border-outline-variant/10 bg-surface-container-high p-4">
                  <div className="space-y-4">
                    <DadosPessoaisField label="Nome do Plano" value={personal.insurance.planName} />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <DadosPessoaisField
                        label="Número da Carteirinha"
                        value={personal.insurance.cardNumber}
                      />
                      <DadosPessoaisField label="Validade" value={personal.insurance.validUntil} />
                    </div>
                  </div>
                </div>
              </section>
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
