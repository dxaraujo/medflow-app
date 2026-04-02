import type { AgendaAppointment, AgendaBlockedSpan, AgendaLunchMarker } from "@/types/agenda"

/** Semana de referência alinhada ao protótipo (seg 14 – dom 20 out 2024) */
export const AGENDA_WEEK_ANCHOR = new Date(2024, 9, 14)

export const weeklyAgendaAppointments: AgendaAppointment[] = [
  {
    id: "a1",
    dayColumn: 0,
    startHour: 10,
    durationHours: 1,
    kind: "retorno",
    patientName: "Ricardo Santos",
    detail: "Retorno pós-operatório",
  },
  {
    id: "a2",
    dayColumn: 0,
    startHour: 14,
    durationHours: 1,
    kind: "primeira_consulta",
    patientName: "Maria Silva",
  },
  {
    id: "a3",
    dayColumn: 1,
    startHour: 9,
    durationHours: 1,
    kind: "procedimento",
    patientName: "João Pereira",
    detail: "Pequena cirurgia",
  },
  {
    id: "a4",
    dayColumn: 1,
    startHour: 11,
    durationHours: 1,
    kind: "urgencia",
    patientName: "Carlos Eduardo",
    detail: "Crise hipertensiva",
    badges: ["urgente", "presenca"],
  },
  {
    id: "a5",
    dayColumn: 2,
    startHour: 15,
    durationHours: 1,
    kind: "retorno",
    patientName: "Ana Costa",
  },
  {
    id: "a6",
    dayColumn: 3,
    startHour: 8,
    durationHours: 1,
    kind: "primeira_consulta",
    patientName: "Pedro Lima",
  },
  {
    id: "a7",
    dayColumn: 5,
    startHour: 9,
    durationHours: 2,
    kind: "primeira_consulta",
    patientName: "Plantão — avaliação",
  },
]

export const weeklyAgendaBlockedSpans: AgendaBlockedSpan[] = [
  {
    id: "b1",
    dayColumn: 4,
    startHour: 8,
    durationHours: 4,
    label: "CONGRESSO MÉDICO",
  },
]

export const weeklyAgendaLunchMarkers: AgendaLunchMarker[] = [{ dayColumn: 0, hour: 12 }]
