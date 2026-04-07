import type { AgendaDayIndex, AgendaWeekColumn, AgendaWeekSegment } from "@/types/agenda"

/** Semana de referência alinhada ao protótipo (seg 14 – dom 20 out 2024) */
export const AGENDA_WEEK_ANCHOR = new Date(2024, 9, 14)

/** Terça 15 destacada como no HTML de referência */
export const AGENDA_DEMO_HIGHLIGHT_DAY_INDEX: AgendaDayIndex = 1

const WEEKDAY_LABELS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"] as const

export function getAgendaWeekDayLabels(anchor: Date = AGENDA_WEEK_ANCHOR): {
  dayIndex: AgendaDayIndex
  weekday: string
  dayOfMonth: number
}[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(anchor)
    d.setDate(anchor.getDate() + i)
    return {
      dayIndex: i as AgendaDayIndex,
      weekday: WEEKDAY_LABELS[i],
      dayOfMonth: d.getDate(),
    }
  })
}

export function formatAgendaWeekRangePt(anchor: Date = AGENDA_WEEK_ANCHOR): string {
  const end = new Date(anchor)
  end.setDate(anchor.getDate() + 6)
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }
  const y = anchor.getFullYear()
  const startStr = anchor.toLocaleDateString("pt-BR", opts)
  const endStr = end.toLocaleDateString("pt-BR", opts)
  return `${startStr} - ${endStr}, ${y}`
}

export const weeklyAgendaColumns: AgendaWeekColumn[] = [
  {
    dayIndex: 0,
    segments: [
      {
        type: "appointment",
        id: "s0-a1",
        timeLabel: "08:30 - 09:30",
        kind: "primeira_consulta",
        patientName: "Beatriz Oliveira",
        detail: "Primeira Consulta",
      },
      { type: "empty_slot", id: "s0-e1", minHeightClass: "min-h-16" },
      {
        type: "appointment",
        id: "s0-a2",
        timeLabel: "10:00 - 11:00",
        kind: "retorno",
        patientName: "Ricardo Santos",
        detail: "Retorno Semanal",
      },
      { type: "lunch", id: "s0-l1" },
      {
        type: "appointment",
        id: "s0-a3",
        timeLabel: "14:00 - 15:30",
        kind: "procedimento",
        patientName: "Mariana Lima",
        detail: "Procedimento Especial",
      },
    ],
  },
  {
    dayIndex: 1,
    segments: [
      { type: "empty_slot", id: "s1-e1", minHeightClass: "min-h-32" },
      {
        type: "appointment",
        id: "s1-a1",
        timeLabel: "11:00 - 12:00",
        kind: "urgencia",
        patientName: "Carlos Eduardo",
        detail: "Crise Hipertensiva",
        variant: "urgent_expanded",
      },
      {
        type: "appointment",
        id: "s1-a2",
        timeLabel: "14:30 - 15:30",
        kind: "primeira_consulta",
        patientName: "Alice Mendes",
      },
    ],
  },
  {
    dayIndex: 2,
    segments: [
      {
        type: "appointment",
        id: "s2-a1",
        timeLabel: "09:00 - 10:00",
        kind: "retorno",
        patientName: "Fernando Costa",
      },
      {
        type: "appointment",
        id: "s2-a2",
        timeLabel: "10:00 - 11:00",
        kind: "retorno",
        patientName: "Julia Paiva",
      },
      {
        type: "free_block",
        id: "s2-f1",
        label: "TARDE LIVRE",
        minHeightClass: "min-h-64",
      },
    ],
  },
  {
    dayIndex: 3,
    segments: [
      {
        type: "appointment",
        id: "s3-a1",
        timeLabel: "08:00 - 09:00",
        kind: "primeira_consulta",
        patientName: "Gustavo Farias",
      },
      { type: "empty_slot", id: "s3-e1", minHeightClass: "min-h-24" },
      {
        type: "appointment",
        id: "s3-a2",
        timeLabel: "11:00 - 12:00",
        kind: "retorno",
        patientName: "Sofia Rocha",
      },
      {
        type: "appointment",
        id: "s3-a3",
        timeLabel: "14:00 - 16:00",
        kind: "procedimento",
        patientName: "Exames Bio",
      },
    ],
  },
  {
    dayIndex: 4,
    segments: [
      {
        type: "blocked",
        id: "s4-b1",
        icon: "event_busy",
        label: "Congresso Médico",
        minHeightClass: "min-h-[600px]",
      },
    ],
  },
  {
    dayIndex: 5,
    segments: [
      {
        type: "on_call",
        id: "s5-o1",
        timeLabel: "09:00 - 12:00",
        title: "Plantão Emergência",
      },
      { type: "empty_slot", id: "s5-e1", minHeightClass: "min-h-full flex-1" },
    ],
  },
  {
    dayIndex: 6,
    segments: [
      {
        type: "blocked",
        id: "s6-b1",
        icon: "beach_access",
        label: "Folga",
        minHeightClass: "min-h-[600px]",
      },
    ],
  },
]

export function getSegmentsForDay(dayIndex: AgendaDayIndex): AgendaWeekSegment[] {
  const col = weeklyAgendaColumns.find((c) => c.dayIndex === dayIndex)
  return col?.segments ?? []
}
