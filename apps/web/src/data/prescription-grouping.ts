import type {
  PatientConsultHistoryRow,
  PatientDetail,
  PatientPrescriptionMedicationRow,
  PatientPrescriptionOrientationRow,
  PatientPrescriptionRow,
} from "@/data/patient-detail-mock"
import type { PrescriptionSubgroupKey } from "@/data/prescription-labels"
import { PRESCRIPTION_RECIPE_SUBGROUP_ORDER } from "@/data/prescription-labels"
import { compareConsultDatesDesc } from "@/utils/consult-date"

/** Um bloco na lista renderizada (medicação ou orientação, com papel visual distinto). */
export type PrescriptionListBlock =
  | { kind: "medication"; item: PatientPrescriptionMedicationRow }
  | { kind: "orientation_linked"; item: PatientPrescriptionOrientationRow }
  | { kind: "orientation_general"; item: PatientPrescriptionOrientationRow }
  | { kind: "orientation_dangling"; item: PatientPrescriptionOrientationRow }

export type PrescriptionSubgroup = {
  key: PrescriptionSubgroupKey
  blocks: PrescriptionListBlock[]
}

export type PrescriptionConsultGroup =
  | {
      kind: "consult"
      consult: PatientConsultHistoryRow
      subgroups: PrescriptionSubgroup[]
    }
  | {
      kind: "orphan"
      label: string
      subgroups: PrescriptionSubgroup[]
    }

function buildSubgroups(items: PatientPrescriptionRow[]): PrescriptionSubgroup[] {
  const medicationsInOrder = items.filter(
    (p): p is PatientPrescriptionMedicationRow => p.kind === "medicacao",
  )
  const orientations = items.filter(
    (p): p is PatientPrescriptionOrientationRow => p.kind === "orientacao",
  )
  const general = orientations.filter((o) => !o.linkedPrescriptionId)
  const linked = orientations.filter((o) => o.linkedPrescriptionId)

  const byLinked = new Map<string, PatientPrescriptionOrientationRow[]>()
  for (const o of linked) {
    const id = o.linkedPrescriptionId!
    if (!byLinked.has(id)) byLinked.set(id, [])
    byLinked.get(id)!.push(o)
  }

  const out: PrescriptionSubgroup[] = []

  for (const rt of PRESCRIPTION_RECIPE_SUBGROUP_ORDER) {
    const medsHere = medicationsInOrder.filter((m) => m.recipeType === rt)
    if (medsHere.length === 0) continue

    const blocks: PrescriptionListBlock[] = []
    for (const med of medsHere) {
      blocks.push({ kind: "medication", item: med })
      const linkedList = byLinked.get(med.id)
      if (linkedList) {
        for (const o of linkedList) {
          blocks.push({ kind: "orientation_linked", item: o })
        }
        byLinked.delete(med.id)
      }
    }
    out.push({ key: rt, blocks })
  }

  const dangling = [...byLinked.values()].flat()
  if (dangling.length > 0) {
    out.push({
      key: "orientacao_vinculada",
      blocks: dangling.map((item) => ({ kind: "orientation_dangling", item })),
    })
  }

  if (general.length > 0) {
    out.push({
      key: "orientacao_geral",
      blocks: general.map((item) => ({ kind: "orientation_general", item })),
    })
  }

  return out
}

/** Ordem plana para listas únicas (ex.: prontuário da consulta): medicação e, em seguida, suas orientações vinculadas. */
export function flattenPrescriptionBlocks(items: PatientPrescriptionRow[]): PrescriptionListBlock[] {
  return buildSubgroups(items).flatMap((sg) => sg.blocks)
}

/**
 * Prescrições agrupadas por consulta (mais recente primeiro), com subgrupos por tipo de receituário.
 * Orientações vinculadas a um medicamento aparecem logo após esse medicamento no mesmo subgrupo.
 * Itens não atribuídos a consulta na lista aparecem em "Sem consulta vinculada".
 */
export function buildPrescriptionsByConsult(detail: PatientDetail): PrescriptionConsultGroup[] {
  const assigned = new Set<string>()
  const sortedConsults = [...detail.consults].sort((a, b) =>
    compareConsultDatesDesc(a.date, b.date),
  )
  const groups: PrescriptionConsultGroup[] = []

  for (const consult of sortedConsults) {
    const items: PatientPrescriptionRow[] = []
    for (const p of detail.prescriptions) {
      if (assigned.has(p.id)) continue
      const byConsultId = p.consultId === consult.id
      const byLink = consult.linkedPrescriptionIds?.includes(p.id) ?? false
      if (byConsultId || byLink) {
        items.push(p)
        assigned.add(p.id)
      }
    }
    if (items.length === 0) continue
    groups.push({ kind: "consult", consult, subgroups: buildSubgroups(items) })
  }

  const orphans = detail.prescriptions.filter((p) => !assigned.has(p.id))
  if (orphans.length > 0) {
    groups.push({
      kind: "orphan",
      label: "Sem consulta vinculada",
      subgroups: buildSubgroups(orphans),
    })
  }

  return groups
}
