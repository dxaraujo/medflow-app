import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import type { PatientConsultHistoryRow } from "@/data/patient-detail-mock"
import { parseConsultDateLabel } from "@/utils/consult-date"
import { ArrowRight, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Link, useParams } from "react-router-dom"

const DIAGNOSIS_DOT = ["bg-orange-400", "bg-emerald-400", "bg-slate-300"] as const

function ConsultHistoryCard({
  row,
  index,
  patientId,
}: {
  row: PatientConsultHistoryRow
  index: number
  patientId: string
}) {
  const { year, dayMonth } = parseConsultDateLabel(row.date)
  const dotClass = DIAGNOSIS_DOT[index % DIAGNOSIS_DOT.length]!

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6">
      <div className="flex shrink-0 flex-row items-center justify-between border-outline-variant/20 pb-4 sm:w-24 sm:flex-col sm:justify-center sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
        {year ? (
          <>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{year}</span>
            <span className="font-headline text-xl font-black text-on-surface sm:text-center">{dayMonth}</span>
          </>
        ) : (
          <span className="font-headline text-center text-sm font-bold text-on-surface">{dayMonth}</span>
        )}
      </div>
      <div className="grid grow grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">Médico responsável</p>
          <div className="flex items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-fixed/40">
              <User className="size-3.5 text-primary" aria-hidden />
            </div>
            <span className="text-sm font-semibold text-on-surface">{row.professional}</span>
          </div>
        </div>
        <div className="sm:col-span-4">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">Queixa principal</p>
          <p className="text-sm italic text-on-surface-variant">&quot;{row.reason}&quot;</p>
        </div>
        <div className="sm:col-span-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">Diagnóstico / patologia</p>
          <div className="flex items-center gap-1.5">
            <span className={`size-1.5 shrink-0 rounded-full ${dotClass}`} aria-hidden />
            <span className="text-sm font-medium text-on-surface">{row.summary}</span>
          </div>
        </div>
        <div className="flex sm:col-span-2 sm:justify-end">
          <Link
            to={`/pacientes/${patientId}/historico/consultas/${row.id}`}
            className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-surface-container-high"
          >
            Ver detalhes
            <ArrowRight
              className="size-[18px] transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function PacienteTabHistorico() {
  const { patientId } = useParams<{ patientId: string }>()
  const { consults } = usePatientDetailOutlet()
  const count = consults.length

  if (!patientId) {
    return null
  }

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <div
        role="tabpanel"
        id="panel-historico"
        aria-labelledby="tab-historico"
        className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8"
      >
        <h3 className="font-headline text-lg font-bold text-on-surface">Histórico de consultas</h3>
        {count === 0 ? (
          <p className="mt-4 font-body text-sm text-on-surface-variant">Sem consultas registradas.</p>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {consults.map((c, i) => (
                <ConsultHistoryCard key={c.id} row={c} index={i} patientId={patientId} />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 text-xs text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
              <p>
                Exibindo {count} {count === 1 ? "consulta" : "consultas"} anteriores encontradas no registro
                histórico.
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  disabled
                  className="flex items-center gap-1 font-bold text-on-surface-variant hover:text-primary disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Anterior
                </button>
                <div className="flex items-center gap-1">
                  <span className="flex size-6 items-center justify-center rounded bg-primary-container font-bold text-white">
                    1
                  </span>
                </div>
                <button
                  type="button"
                  disabled
                  className="flex items-center gap-1 font-bold text-on-surface-variant hover:text-primary disabled:opacity-30"
                >
                  Próxima
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
