import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import { cn } from "@heroui/react"
import { flattenPrescriptionBlocks, type PrescriptionListBlock } from "@/data/prescription-grouping"
import type { PatientConsultRecord, PatientPrescriptionRow } from "@/data/patient-detail-mock"
import { getConsultRecord } from "@/data/patient-detail-mock"
import { ArrowLeft, Printer, Stethoscope, User } from "lucide-react"
import type { ReactNode } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

function Section({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm",
        className,
      )}
    >
      <h4 className="mb-3 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        {title}
      </h4>
      <div className="font-body text-sm leading-relaxed text-on-surface">{children}</div>
    </section>
  )
}

function ConsultPrescriptionBlockRow({
  block,
  compactAfterMed,
  prescriptionById,
}: {
  block: PrescriptionListBlock
  compactAfterMed: boolean
  prescriptionById: Map<string, PatientPrescriptionRow>
}) {
  switch (block.kind) {
    case "medication": {
      const p = block.item
      return (
        <li className="rounded-lg border border-outline-variant/10 bg-surface-container-high/40 p-3">
          <p className="font-semibold text-on-surface">{p.drug}</p>
          <p className="text-xs text-on-surface-variant">
            {p.dose} · {p.frequency} · {p.status}
          </p>
        </li>
      )
    }
    case "orientation_linked": {
      const p = block.item
      return (
        <li
          className={cn(
            "rounded-r-md border border-outline-variant/8 border-l-outline-variant/30 bg-surface-container-highest/30 py-2 pl-3 pr-2 text-on-surface-variant sm:ml-3 sm:border-l-2 sm:pl-3",
            compactAfterMed && "-mt-0.5",
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant/55">
            Orientação (medicamento acima)
          </p>
          <p className="mt-0.5 text-sm leading-snug">{p.drug}</p>
          <p className="mt-1 text-[11px] text-on-surface-variant/70">
            {p.status}
            {p.start ? ` · ${p.start}` : ""}
          </p>
        </li>
      )
    }
    case "orientation_general": {
      const p = block.item
      return (
        <li className="rounded-lg border border-secondary-container/35 bg-secondary-container/10 p-3">
          <p className="text-[10px] font-bold uppercase text-on-secondary-container">Orientação geral</p>
          <p className="mt-1 font-semibold text-on-surface">{p.drug}</p>
          <p className="mt-1 text-xs text-on-surface-variant">
            {p.status}
            {p.start ? ` · ${p.start}` : ""}
          </p>
        </li>
      )
    }
    case "orientation_dangling": {
      const p = block.item
      const linked = p.linkedPrescriptionId ? prescriptionById.get(p.linkedPrescriptionId) : undefined
      const linkedName = linked?.kind === "medicacao" ? linked.drug : undefined
      return (
        <li className="rounded-lg border border-outline-variant/15 bg-surface-container-high/25 p-3">
          <p className="text-[10px] font-bold uppercase text-on-surface-variant">Orientação vinculada</p>
          <p className="mt-1 font-semibold text-on-surface">{p.drug}</p>
          {p.linkedPrescriptionId ? (
            <p className="mt-0.5 text-xs text-on-surface-variant">
              {linkedName ? (
                <>
                  Referente a <span className="font-medium text-on-surface">{linkedName}</span>
                </>
              ) : (
                "Medicamento vinculado não listado neste atendimento."
              )}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-on-surface-variant">
            {p.status}
            {p.start ? ` · ${p.start}` : ""}
          </p>
        </li>
      )
    }
    default: {
      const _x: never = block
      return _x
    }
  }
}

function VitalsGrid({ vitals }: { vitals: PatientConsultRecord["vitalsAtVisit"] }) {
  if (vitals.length === 0) {
    return <p className="text-on-surface-variant">Nenhum sinal vital registrado nesta consulta.</p>
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {vitals.map((v) => (
        <div
          key={v.id}
          className="rounded-lg border border-outline-variant/10 bg-surface-container-high/50 px-3 py-2"
        >
          <p className="text-[10px] font-bold uppercase text-on-surface-variant">{v.label}</p>
          <p className="font-headline text-lg font-bold text-on-surface">
            {v.value}
            {v.unit ? <span className="text-sm font-medium text-on-surface-variant"> {v.unit}</span> : null}
          </p>
          {v.capturedAtLabel ? (
            <p className="text-[10px] text-on-surface-variant">{v.capturedAtLabel}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function PacienteConsultaDetalhePage() {
  const { patientId, consultId } = useParams<{ patientId: string; consultId: string }>()
  const detail = usePatientDetailOutlet()

  if (!patientId || !consultId) {
    return <Navigate to="/pacientes" replace />
  }

  const record = getConsultRecord(patientId, consultId)
  if (!record) {
    return <Navigate to={`/pacientes/${patientId}/historico`} replace />
  }

  const { summary, personal } = detail
  const prescriptions = detail.prescriptions.filter((p) => record.linkedPrescriptionIds?.includes(p.id))
  const prescriptionBlocks = flattenPrescriptionBlocks(prescriptions)
  const prescriptionById = new Map(detail.prescriptions.map((x) => [x.id, x] as const))
  const exams = detail.exams.filter((x) => record.linkedExamIds?.includes(x.id))

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="col-span-12 print:col-span-full">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to={`/pacientes/${patientId}/historico`}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-label text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Voltar ao histórico
        </Link>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest px-4 py-2 font-label text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-surface-container-high"
        >
          <Printer className="size-4" aria-hidden />
          Imprimir
        </button>
      </div>

      <article
        id="consulta-print-root"
        className="space-y-6 print:shadow-none"
      >
        <header className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Prontuário da consulta
              </p>
              <h1 className="mt-2 font-headline text-2xl font-bold text-primary md:text-3xl">
                {record.dateLabel}
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant">{record.metadata.startedAt ?? "—"}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-primary-container/10 px-4 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed/50">
                <User className="size-5 text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">Profissional responsável</p>
                <p className="font-headline font-semibold text-on-surface">{record.professional}</p>
                <p className="mt-0.5 text-xs text-on-surface-variant">
                  {[record.metadata.crm, record.metadata.specialty].filter(Boolean).join(" · ")}
                </p>
                {record.metadata.unit ? (
                  <p className="mt-1 text-xs text-on-surface-variant">{record.metadata.unit}</p>
                ) : null}
                {record.metadata.visitType ? (
                  <p className="mt-1 inline-block rounded-full bg-secondary-container/50 px-2 py-0.5 text-xs font-medium text-on-secondary-container">
                    {record.metadata.visitType}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 border-t border-outline-variant/15 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="size-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">Paciente</p>
                <p className="font-semibold text-on-surface">{personal.fullName}</p>
                <p className="text-xs text-on-surface-variant">
                  {summary.displayId} · {personal.gender} · Nasc. {personal.birthDate}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-on-surface-variant">Documento</p>
              <p className="text-sm text-on-surface">CPF {personal.cpf}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <Section title="Queixa principal">
            <p className="italic text-on-surface-variant">"{record.chiefComplaint}"</p>
          </Section>
          <Section title="História da doença atual (HDA)">
            <p className="whitespace-pre-wrap">{record.historyOfPresentIllness}</p>
          </Section>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Section title="Revisão por sistemas">
            {record.reviewOfSystems ? (
              <p className="whitespace-pre-wrap">{record.reviewOfSystems}</p>
            ) : (
              <p className="text-on-surface-variant">—</p>
            )}
          </Section>
          <div className="space-y-6">
            <Section title="Antecedentes pessoais">
              {record.pastMedicalHistory ? (
                <p className="whitespace-pre-wrap">{record.pastMedicalHistory}</p>
              ) : (
                <p className="text-on-surface-variant">—</p>
              )}
            </Section>
            <Section title="Antecedentes familiares">
              {record.familyHistory ? (
                <p className="whitespace-pre-wrap">{record.familyHistory}</p>
              ) : (
                <p className="text-on-surface-variant">—</p>
              )}
            </Section>
          </div>
        </section>

        <Section title="Medicamentos em uso (relato)">
          {record.medicationsAtVisit ? (
            <p className="whitespace-pre-wrap">{record.medicationsAtVisit}</p>
          ) : (
            <p className="text-on-surface-variant">—</p>
          )}
        </Section>

        <Section title="Alergias (referência na consulta)">
          {record.allergiesSnapshot && record.allergiesSnapshot.length > 0 ? (
            <ul className="list-inside list-disc space-y-1">
              {record.allergiesSnapshot.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          ) : (
            <p className="text-on-surface-variant">Nenhuma alergia registrada neste atendimento.</p>
          )}
        </Section>

        <Section title="Sinais vitais (nesta consulta)">
          <VitalsGrid vitals={record.vitalsAtVisit} />
        </Section>

        <Section title="Exame físico">
          <p className="whitespace-pre-wrap">{record.physicalExam}</p>
        </Section>

        <Section title="Diagnósticos (CID-10)">
          {record.diagnoses.length === 0 ? (
            <p className="text-on-surface-variant">—</p>
          ) : (
            <ul className="space-y-2">
              {record.diagnoses.map((d, i) => (
                <li key={`${d.label}-${i}`} className="flex flex-wrap items-baseline gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-bold uppercase",
                      d.type === "principal"
                        ? "bg-primary/15 text-primary"
                        : "bg-surface-container-high text-on-surface-variant",
                    )}
                  >
                    {d.type === "principal" ? "Principal" : "Secundário"}
                  </span>
                  {d.cid10 ? (
                    <span className="font-mono text-sm font-medium text-on-surface">{d.cid10}</span>
                  ) : null}
                  <span>{d.label}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Evolução / notas (SOAP ou texto livre)">
          <p className="whitespace-pre-wrap">{record.clinicalNotes}</p>
        </Section>

        <Section title="Plano / conduta">
          <p className="whitespace-pre-wrap">{record.plan}</p>
        </Section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Section title="Prescrições vinculadas">
            {prescriptionBlocks.length === 0 ? (
              <p className="text-on-surface-variant">Nenhuma prescrição vinculada a este atendimento.</p>
            ) : (
              <ul className="space-y-2.5">
                {prescriptionBlocks.map((block, i) => {
                  const prev = i > 0 ? prescriptionBlocks[i - 1] : undefined
                  const afterMed =
                    block.kind === "orientation_linked" &&
                    (prev?.kind === "medication" || prev?.kind === "orientation_linked")
                  return (
                    <ConsultPrescriptionBlockRow
                      key={block.item.id}
                      block={block}
                      compactAfterMed={afterMed}
                      prescriptionById={prescriptionById}
                    />
                  )
                })}
              </ul>
            )}
          </Section>
          <Section title="Exames vinculados">
            {exams.length === 0 ? (
              <p className="text-on-surface-variant">Nenhum exame vinculado a este atendimento.</p>
            ) : (
              <ul className="space-y-3">
                {exams.map((x) => (
                  <li
                    key={x.id}
                    className="rounded-lg border border-outline-variant/10 bg-surface-container-high/40 p-3"
                  >
                    <p className="font-semibold text-on-surface">{x.name}</p>
                    <p className="text-xs text-on-surface-variant">
                      {x.date} · {x.status}
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">{x.resultSummary}</p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </section>

        <Section title="Documentos e observações">
          {record.documentsNote ? (
            <p className="whitespace-pre-wrap">{record.documentsNote}</p>
          ) : (
            <p className="text-on-surface-variant">—</p>
          )}
        </Section>

        <footer className="rounded-xl border border-dashed border-outline-variant/30 bg-surface-container-low/50 px-4 py-3 text-center text-xs text-on-surface-variant">
          Registro clínico para fins de demonstração — Medflow
        </footer>
      </article>
    </div>
  )
}
