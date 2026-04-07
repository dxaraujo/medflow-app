import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import { PRESCRIPTION_SUBGROUP_LABEL } from "@/data/prescription-labels"
import {
  buildPrescriptionsByConsult,
  type PrescriptionListBlock,
} from "@/data/prescription-grouping"
import type { PatientPrescriptionRow } from "@/data/patient-detail-mock"
import { parseConsultDateLabel } from "@/utils/consult-date"
import { cn } from "@heroui/react"
import { CalendarDays, ExternalLink, Pill } from "lucide-react"
import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"

function ConsultDateRail({ dateLabel }: { dateLabel: string }) {
  const { year, dayMonth } = parseConsultDateLabel(dateLabel)
  return (
    <div
      className="flex w-full shrink-0 flex-col items-center justify-center gap-0.5 bg-primary-container px-4 py-5 text-center text-on-primary sm:w-32 sm:py-6"
      aria-hidden
    >
      {year ? (
        <>
          <span className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary/85">
            {year}
          </span>
          <span className="font-headline text-2xl font-black leading-none tracking-tight sm:text-[1.65rem]">
            {dayMonth}
          </span>
        </>
      ) : (
        <span className="font-headline text-sm font-bold leading-snug">{dayMonth}</span>
      )}
    </div>
  )
}

function MedicationPrescriptionCard({ p }: { p: Extract<PrescriptionListBlock, { kind: "medication" }>["item"] }) {
  return (
    <li
      className={cn(
        "rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3.5 shadow-sm transition-shadow hover:border-outline-variant/35 hover:shadow",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Pill className="size-4 shrink-0 text-primary" aria-hidden />
            <p className="font-headline font-semibold text-on-surface">{p.drug}</p>
          </div>
          <p className="mt-1.5 font-body text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">{p.dose}</span>
            {" · "}
            {p.frequency}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-outline-variant/10 pt-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-container-high px-2 py-1 font-label text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
              <CalendarDays className="size-3.5 shrink-0 text-primary" aria-hidden />
              Início {p.start}
            </span>
            {p.end && p.end !== "—" ? (
              <span className="font-body text-xs text-on-surface-variant">Fim {p.end}</span>
            ) : null}
            <span className="rounded-full bg-primary-fixed/35 px-2.5 py-0.5 font-label text-[11px] font-bold text-primary">
              {p.status}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

/** Orientação logo após o medicamento: mesmo tipo de receita, visual mais discreto. */
function LinkedOrientationCard({
  p,
  compactAfterMed,
}: {
  p: Extract<PrescriptionListBlock, { kind: "orientation_linked" }>["item"]
  compactAfterMed: boolean
}) {
  return (
    <li
      className={cn(
        "rounded-r-lg rounded-bl-lg border border-outline-variant/12 border-l-outline-variant/35 bg-surface-container-highest/35 py-2.5 pl-3 pr-3 shadow-none sm:ml-4 sm:border-l-2 sm:pl-4",
        compactAfterMed && "-mt-0.5 pt-2",
      )}
    >
      <p className="font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant/55">
        Orientação sobre o medicamento acima
      </p>
      <p className="mt-1 font-body text-sm leading-snug text-on-surface-variant">{p.drug}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-outline-variant/8 pt-2">
        <span className="font-label text-[10px] font-medium uppercase tracking-wide text-on-surface-variant/50">
          Início {p.start}
        </span>
        <span className="text-on-surface-variant/40">·</span>
        <span className="font-label text-[10px] font-medium text-on-surface-variant/55">{p.status}</span>
      </div>
    </li>
  )
}

function GeneralOrientationCard({
  p,
  prescriptionById,
}: {
  p: Extract<PrescriptionListBlock, { kind: "orientation_general" }>["item"]
  prescriptionById: Map<string, PatientPrescriptionRow>
}) {
  return (
    <PrescriptionOrientationStandaloneCard
      p={p}
      prescriptionById={prescriptionById}
      variant="general"
    />
  )
}

function DanglingLinkedOrientationCard({
  p,
  prescriptionById,
}: {
  p: Extract<PrescriptionListBlock, { kind: "orientation_dangling" }>["item"]
  prescriptionById: Map<string, PatientPrescriptionRow>
}) {
  return (
    <PrescriptionOrientationStandaloneCard
      p={p}
      prescriptionById={prescriptionById}
      variant="dangling"
    />
  )
}

function PrescriptionOrientationStandaloneCard({
  p,
  prescriptionById,
  variant,
}: {
  p: Extract<PrescriptionListBlock, { kind: "orientation_general" | "orientation_dangling" }>["item"]
  prescriptionById: Map<string, PatientPrescriptionRow>
  variant: "general" | "dangling"
}) {
  const linkedMed =
    p.linkedPrescriptionId ? prescriptionById.get(p.linkedPrescriptionId) : undefined
  const linkedDrugName =
    linkedMed?.kind === "medicacao" ? linkedMed.drug : linkedMed ? "(registro não é medicamento)" : null

  return (
    <li
      className={cn(
        "rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3.5 shadow-sm transition-shadow hover:border-outline-variant/35 hover:shadow",
        variant === "general" && "border-secondary-container/50 bg-secondary-container/15",
        variant === "dangling" && "border-outline-variant/25 bg-surface-container-high/30",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-wide",
                variant === "general"
                  ? "bg-secondary-container text-on-secondary"
                  : "bg-surface-container-high text-on-surface-variant",
              )}
            >
              {variant === "general" ? "Orientação geral" : "Orientação vinculada"}
            </span>
            <p className="font-headline font-semibold text-on-surface">{p.drug}</p>
          </div>
          {variant === "dangling" && p.linkedPrescriptionId ? (
            <p className="mt-1 font-body text-xs text-on-surface-variant">
              {linkedDrugName ? (
                <>
                  Referente a <span className="font-semibold text-on-surface">{linkedDrugName}</span>
                </>
              ) : (
                <span className="text-on-surface-variant/80">
                  Medicamento vinculado não encontrado nesta lista.
                </span>
              )}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-outline-variant/10 pt-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-container-high px-2 py-1 font-label text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
              <CalendarDays className="size-3.5 shrink-0 text-primary" aria-hidden />
              Início {p.start}
            </span>
            {p.end && p.end !== "—" ? (
              <span className="font-body text-xs text-on-surface-variant">Fim {p.end}</span>
            ) : null}
            <span className="rounded-full bg-primary-fixed/35 px-2.5 py-0.5 font-label text-[11px] font-bold text-primary">
              {p.status}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

function PrescriptionBlockRow({
  block,
  prescriptionById,
  compactAfterMed,
}: {
  block: PrescriptionListBlock
  prescriptionById: Map<string, PatientPrescriptionRow>
  compactAfterMed: boolean
}) {
  switch (block.kind) {
    case "medication":
      return <MedicationPrescriptionCard p={block.item} />
    case "orientation_linked":
      return <LinkedOrientationCard p={block.item} compactAfterMed={compactAfterMed} />
    case "orientation_general":
      return <GeneralOrientationCard p={block.item} prescriptionById={prescriptionById} />
    case "orientation_dangling":
      return <DanglingLinkedOrientationCard p={block.item} prescriptionById={prescriptionById} />
    default: {
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}

export function PacienteTabPrescricoes() {
  const { patientId } = useParams<{ patientId: string }>()
  const detail = usePatientDetailOutlet()
  const groups = buildPrescriptionsByConsult(detail)
  const hasAny = detail.prescriptions.length > 0
  const prescriptionById = useMemo(
    () => new Map(detail.prescriptions.map((x) => [x.id, x] as const)),
    [detail.prescriptions],
  )

  if (!patientId) {
    return null
  }

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <div
        role="tabpanel"
        id="panel-prescricoes"
        aria-labelledby="tab-prescricoes"
        className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm md:p-8"
      >
        <h3 className="font-headline text-lg font-bold text-on-surface">Prescrições solicitadas</h3>
        <p className="mt-1 font-body text-sm text-on-surface-variant">
          Cada bloco mostra a <strong className="font-semibold text-on-surface">data da consulta</strong> à
          esquerda; dentro dele, as prescrições por tipo de receituário (mais recente primeiro). Orientações
          específicas de um medicamento aparecem logo abaixo dele, com destaque reduzido.
        </p>
        {!hasAny ? (
          <p className="mt-4 font-body text-sm text-on-surface-variant">
            Sem prescrições ativas ou recentes.
          </p>
        ) : (
          <div className="relative mt-10 space-y-8 md:space-y-10">
            {/* linha do tempo entre blocos */}
            <div
              className="absolute bottom-4 left-13 top-10 hidden w-px bg-linear-to-b from-primary-container/50 via-outline-variant/40 to-transparent md:block"
              aria-hidden
            />

            {groups.map((g, groupIndex) => (
              <section
                key={g.kind === "consult" ? g.consult.id : "orphan"}
                className="relative"
              >
                {g.kind === "consult" ? (
                  <div className="overflow-hidden rounded-2xl border-2 border-primary-container/25 bg-surface-container-lowest shadow-md ring-1 ring-primary/10">
                    <div className="flex flex-col sm:flex-row">
                      <ConsultDateRail dateLabel={g.consult.date} />
                      <div className="min-w-0 flex-1 border-t border-primary-container/15 sm:border-l sm:border-t-0">
                        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                                Consulta {groupIndex + 1}
                              </span>
                              <span className="font-label text-xs font-semibold text-on-surface-variant">
                                {g.consult.date}
                              </span>
                            </div>
                            <p className="mt-2 font-headline text-lg font-bold text-on-surface sm:text-xl">
                              {g.consult.professional}
                            </p>
                            <p className="mt-1 text-sm leading-snug text-on-surface-variant">
                              <span className="font-medium text-on-surface">{g.consult.reason}</span>
                              <span className="text-on-surface-variant"> — </span>
                              {g.consult.summary}
                            </p>
                          </div>
                          <Link
                            to={`/pacientes/${patientId}/historico/consultas/${g.consult.id}`}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary-fixed/25 px-4 py-2.5 font-label text-sm font-bold text-primary transition-colors hover:bg-primary-fixed/40"
                          >
                            Prontuário
                            <ExternalLink className="size-4" aria-hidden />
                          </Link>
                        </div>

                        <div className="space-y-6 border-t border-outline-variant/15 bg-surface-container-low/60 px-5 py-5 sm:px-6 sm:py-6">
                          {g.subgroups.map((sg) => (
                            <div key={sg.key}>
                              <h4 className="mb-3 flex items-center gap-2 border-b border-outline-variant/20 pb-2 font-label text-xs font-bold uppercase tracking-widest text-primary">
                                <span className="size-2 rounded-full bg-primary" aria-hidden />
                                {PRESCRIPTION_SUBGROUP_LABEL[sg.key]}
                              </h4>
                              <ul className="space-y-2.5">
                                {sg.blocks.map((block, i) => {
                                  const prev = i > 0 ? sg.blocks[i - 1] : undefined
                                  const compactAfterMed =
                                    block.kind === "orientation_linked" &&
                                    (prev?.kind === "medication" || prev?.kind === "orientation_linked")
                                  return (
                                    <PrescriptionBlockRow
                                      key={block.item.id}
                                      block={block}
                                      prescriptionById={prescriptionById}
                                      compactAfterMed={compactAfterMed}
                                    />
                                  )
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border-2 border-dashed border-outline-variant/40 bg-surface-container-high/30 shadow-sm">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex w-full shrink-0 flex-col items-center justify-center gap-1 bg-surface-container-highest px-4 py-5 text-center sm:w-32">
                        <CalendarDays className="size-8 text-on-surface-variant" aria-hidden />
                        <span className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                          Sem data de consulta
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 border-t border-outline-variant/25 sm:border-l sm:border-t-0">
                        <div className="p-5 sm:p-6">
                          <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                            {g.label}
                          </p>
                          <p className="mt-1 font-headline text-lg font-bold text-on-surface">
                            Itens fora do vínculo com consultas listadas
                          </p>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            Verifique o histórico de consultas ou o cadastro destas prescrições.
                          </p>
                        </div>
                        <div className="space-y-6 border-t border-outline-variant/15 px-5 py-5 sm:px-6 sm:py-6">
                          {g.subgroups.map((sg) => (
                            <div key={sg.key}>
                              <h4 className="mb-3 flex items-center gap-2 border-b border-outline-variant/20 pb-2 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                <span className="size-2 rounded-full bg-on-surface-variant/60" aria-hidden />
                                {PRESCRIPTION_SUBGROUP_LABEL[sg.key]}
                              </h4>
                              <ul className="space-y-2.5">
                                {sg.blocks.map((block, i) => {
                                  const prev = i > 0 ? sg.blocks[i - 1] : undefined
                                  const compactAfterMed =
                                    block.kind === "orientation_linked" &&
                                    (prev?.kind === "medication" || prev?.kind === "orientation_linked")
                                  return (
                                    <PrescriptionBlockRow
                                      key={block.item.id}
                                      block={block}
                                      prescriptionById={prescriptionById}
                                      compactAfterMed={compactAfterMed}
                                    />
                                  )
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
