import type { AttendanceMonthPoint } from "@/data/attendance-series"
import type { AttendanceWeekDayPoint } from "@/data/attendance-weekly-series"
import type { PatientConsultRecord, PatientDetail } from "@/data/patient-detail-mock"
import type { PatientRow } from "@/data/patients-mock"
import type { AgendaWeekColumn } from "@/types/agenda"

const API_PREFIX = "/api"

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!res.ok) {
    let message = text || res.statusText
    try {
      const j = JSON.parse(text) as { error?: string }
      if (j.error) message = j.error
    } catch {
      /* keep message */
    }
    throw new Error(message)
  }
  return text ? (JSON.parse(text) as T) : ({} as T)
}

export type PatientsListResponse = {
  totalDirectory: number
  patients: PatientRow[]
}

export async function fetchPatientsList(): Promise<PatientsListResponse> {
  const res = await fetch(`${API_PREFIX}/patients`)
  return parseJson<PatientsListResponse>(res)
}

export async function fetchPatientDetail(patientId: string): Promise<PatientDetail | null> {
  const res = await fetch(`${API_PREFIX}/patients/${encodeURIComponent(patientId)}`)
  if (res.status === 404) return null
  return parseJson<PatientDetail>(res)
}

export async function fetchConsultRecord(
  patientId: string,
  consultId: string,
): Promise<PatientConsultRecord | null> {
  const res = await fetch(
    `${API_PREFIX}/patients/${encodeURIComponent(patientId)}/consults/${encodeURIComponent(consultId)}`,
  )
  if (res.status === 404) return null
  return parseJson<PatientConsultRecord>(res)
}

export type AgendaWeekResponse = {
  weekStart: string
  highlightDayIndex: number
  weekRangeLabel: string
  columns: AgendaWeekColumn[]
}

/** Semana seedada no Mongo (alinhada ao protótipo). */
export const DEFAULT_AGENDA_WEEK_START = "2024-10-14"

export async function fetchAgendaWeek(weekStart: string): Promise<AgendaWeekResponse | null> {
  const q = new URLSearchParams({ weekStart })
  const res = await fetch(`${API_PREFIX}/agenda/week?${q}`)
  if (res.status === 404) return null
  return parseJson<AgendaWeekResponse>(res)
}

export type DashboardAttendancePayload = {
  monthly: AttendanceMonthPoint[]
  weekly: AttendanceWeekDayPoint[]
  tilesSemanal: { label: string; value: string; valueClassName: string }[]
  tilesHistorico: { label: string; value: string; valueClassName: string }[]
}

export async function fetchDashboardAttendance(): Promise<DashboardAttendancePayload> {
  const res = await fetch(`${API_PREFIX}/dashboard/attendance`)
  return parseJson<DashboardAttendancePayload>(res)
}

export function weekStartToAnchorLocal(weekStart: string): Date {
  const [y, m, d] = weekStart.split("-").map((x) => Number(x))
  return new Date(y, m - 1, d)
}
