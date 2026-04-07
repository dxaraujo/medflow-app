import type { PatientDetail, PatientDetailTabId } from "@/data/patient-detail-mock"
import { useOutletContext } from "react-router-dom"

/** Segmento de URL por aba (kebab-case onde necessário). */
export const PATIENT_TAB_PATH_SEGMENT: Record<PatientDetailTabId, string> = {
  evolucao: "evolucao",
  dados_pessoais: "dados-pessoais",
  historico: "historico",
  prescricoes: "prescricoes",
  exames: "exames",
}

export function patientTabPathSegment(tabId: PatientDetailTabId): string {
  return PATIENT_TAB_PATH_SEGMENT[tabId]
}

export function patientTabIdFromPathSegment(segment: string): PatientDetailTabId | undefined {
  const found = (Object.entries(PATIENT_TAB_PATH_SEGMENT) as [PatientDetailTabId, string][]).find(
    ([, path]) => path === segment,
  )
  return found?.[0]
}

export type PatientDetailOutletContext = {
  detail: PatientDetail
}

export function usePatientDetailOutlet(): PatientDetail {
  const { detail } = useOutletContext<PatientDetailOutletContext>()
  return detail
}
