import type { PatientPrescriptionRecipeType } from "@/data/patient-detail-mock"

export const PRESCRIPTION_RECIPE_LABEL: Record<PatientPrescriptionRecipeType, string> = {
  receituario_simples: "Receituário simples",
  receita_controle_especial: "Receita de controle especial",
  receita_azul: "Receita azul",
  receita_amarela: "Receita amarela",
  receita_branca_talidomida: "Receita branca de Talidomida",
  receita_branca_retinoides: "Receita branca para Retinóides",
}

/** Chaves de subgrupo na aba de prescrições (receituários + orientações). */
export type PrescriptionSubgroupKey =
  | PatientPrescriptionRecipeType
  | "orientacao_vinculada"
  | "orientacao_geral"

export const PRESCRIPTION_SUBGROUP_LABEL: Record<PrescriptionSubgroupKey, string> = {
  ...PRESCRIPTION_RECIPE_LABEL,
  orientacao_vinculada: "Orientação vinculada a medicamento",
  orientacao_geral: "Orientação geral",
}

/** Ordem dos tipos de receituário (medicamentos + orientações vinculadas logo abaixo de cada um). */
export const PRESCRIPTION_RECIPE_SUBGROUP_ORDER: PatientPrescriptionRecipeType[] = [
  "receituario_simples",
  "receita_controle_especial",
  "receita_azul",
  "receita_amarela",
  "receita_branca_talidomida",
  "receita_branca_retinoides",
]

/**
 * Ordem lógica completa: receitas; depois orientações vinculadas órfãs (sem medicamento na lista);
 * por último orientações gerais.
 */
export const PRESCRIPTION_SUBGROUP_ORDER: PrescriptionSubgroupKey[] = [
  ...PRESCRIPTION_RECIPE_SUBGROUP_ORDER,
  "orientacao_vinculada",
  "orientacao_geral",
]
