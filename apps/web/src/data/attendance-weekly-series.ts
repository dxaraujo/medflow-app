import type { AttendanceBarTone } from "@/data/attendance-series"

export type AttendanceWeekDayPoint = {
  weekday: string
  value: number
  tone: AttendanceBarTone
}

export const ATTENDANCE_WEEKLY_BAR_DATA: AttendanceWeekDayPoint[] = [
  { weekday: "Seg", value: 72, tone: "mid" },
  { weekday: "Ter", value: 85, tone: "strong" },
  { weekday: "Qua", value: 100, tone: "peak" },
  { weekday: "Qui", value: 78, tone: "mid" },
  { weekday: "Sex", value: 68, tone: "mid" },
  { weekday: "Sáb", value: 42, tone: "soft" },
  { weekday: "Dom", value: 0, tone: "soft" },
]

export const WEEKLY_METRIC_TILES = [
  { label: "Atendimentos na Semana", value: "186", valueClassName: "text-primary" },
  { label: "Ausências / Faltas", value: "8", valueClassName: "text-error" },
  { label: "Retornos", value: "45", valueClassName: "text-on-secondary-container" },
  { label: "Novos Pacientes", value: "12", valueClassName: "text-primary-container" },
] as const
