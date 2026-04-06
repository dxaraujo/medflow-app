/** Tipo de consulta / cor do cartão na vista semanal */
export type AgendaAppointmentKind = "retorno" | "primeira_consulta" | "procedimento" | "urgencia"

/** Segunda = 0 … Domingo = 6 */
export type AgendaDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type AgendaWeekSegment =
  | {
      type: "appointment"
      id: string
      timeLabel: string
      kind: AgendaAppointmentKind
      patientName: string
      detail?: string
      /** Card expandido com URGENTE + ações (protótipo Terça) */
      variant?: "default" | "urgent_expanded"
    }
  | {
      type: "empty_slot"
      id: string
      /** Classes Tailwind de altura, ex. h-16, h-24, h-full */
      minHeightClass: string
    }
  | { type: "lunch"; id: string }
  | {
      type: "blocked"
      id: string
      icon: "event_busy" | "beach_access"
      label: string
      minHeightClass: string
    }
  | {
      type: "free_block"
      id: string
      label: string
      minHeightClass: string
    }
  | {
      type: "on_call"
      id: string
      timeLabel: string
      title: string
    }

export type AgendaWeekColumn = {
  dayIndex: AgendaDayIndex
  segments: AgendaWeekSegment[]
}
