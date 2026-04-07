export type AttendanceBarTone = "mid" | "strong" | "peak" | "soft"

export type AttendanceMonthPoint = {
  month: string
  value: number
  tone: AttendanceBarTone
}

export const MONTHLY_METRIC_TILES = [
  { label: "Total Atendimentos", value: "1.250", valueClassName: "text-primary" },
  { label: "Ausências / Faltas", value: "42", valueClassName: "text-error" },
  { label: "Retornos", value: "312", valueClassName: "text-on-secondary-container" },
  { label: "Novos Pacientes", value: "128", valueClassName: "text-primary-container" },
] as const

export const ATTENDANCE_BAR_DATA: AttendanceMonthPoint[] = [
  { month: "Jan", value: 65, tone: "mid" },
  { month: "Fev", value: 72, tone: "mid" },
  { month: "Mar", value: 85, tone: "mid" },
  { month: "Abr", value: 60, tone: "mid" },
  { month: "Mai", value: 78, tone: "mid" },
  { month: "Jun", value: 92, tone: "strong" },
  { month: "Jul", value: 100, tone: "peak" },
  { month: "Ago", value: 45, tone: "soft" },
  { month: "Set", value: 30, tone: "soft" },
  { month: "Out", value: 25, tone: "soft" },
  { month: "Nov", value: 15, tone: "soft" },
  { month: "Dez", value: 10, tone: "soft" },
]
