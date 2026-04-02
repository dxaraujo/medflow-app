export type AgendaAppointmentKind = "retorno" | "primeira_consulta" | "procedimento" | "urgencia"

export type AgendaBadge = "urgente" | "presenca"

export type AgendaAppointment = {
  id: string
  /** 0 = segunda … 4 = sexta, 5 = fim de semana (coluna única) */
  dayColumn: 0 | 1 | 2 | 3 | 4 | 5
  /** Hora de início (0–23), ex.: 10 = 10:00 */
  startHour: number
  /** Duração em horas (pode ser fracionária, ex. 0.5) */
  durationHours: number
  kind: AgendaAppointmentKind
  patientName: string
  detail?: string
  badges?: AgendaBadge[]
}

export type AgendaBlockedSpan = {
  id: string
  dayColumn: 0 | 1 | 2 | 3 | 4 | 5
  startHour: number
  durationHours: number
  label: string
}

export type AgendaLunchMarker = {
  dayColumn: 0 | 1 | 2 | 3 | 4 | 5
  hour: number
}
