/** Primeira linha de horário exibida (inclusiva) */
export const AGENDA_START_HOUR = 8
/** Última linha corresponde a este horário como início do slot (ex.: 17:00–18:00) */
export const AGENDA_END_HOUR = 18
/** Altura de cada hora na grade (Tailwind h-14 = 3.5rem) */
export const AGENDA_HOUR_HEIGHT_REM = 3.5

export function agendaHourSlots(): number[] {
  const slots: number[] = []
  for (let h = AGENDA_START_HOUR; h < AGENDA_END_HOUR; h += 1) {
    slots.push(h)
  }
  return slots
}

export function agendaTotalHours(): number {
  return AGENDA_END_HOUR - AGENDA_START_HOUR
}
