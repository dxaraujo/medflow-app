/** Meses abreviados em PT (consultas no mock: "12 Out, 2023"). */
const MONTH_MAP: Record<string, number> = {
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  mai: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
}

/**
 * Parse "12 Out, 2023" ou similar para exibição (ano + dia/mês).
 */
export function parseConsultDateLabel(date: string): { year: string; dayMonth: string } {
  const m = date.match(/^(.+),\s*(\d{4})\s*$/)
  if (m) {
    return { year: m[2]!.trim(), dayMonth: m[1]!.trim() }
  }
  return { year: "", dayMonth: date }
}

/**
 * Timestamp UTC para ordenação (mais recente = maior).
 * Retorna 0 se não reconhecer o formato.
 */
export function consultDateToTimestamp(dateLabel: string): number {
  const trimmed = dateLabel.trim()
  const m = trimmed.match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)[,\s]+(\d{4})\s*$/)
  if (!m) return 0
  const day = Number.parseInt(m[1]!, 10)
  const monRaw = m[2]!.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")
  const year = Number.parseInt(m[3]!, 10)
  const monKey = monRaw.slice(0, 3)
  const month = MONTH_MAP[monKey]
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) return 0
  return Date.UTC(year, month, day)
}

/** Ordenação: mais recente primeiro (desc). */
export function compareConsultDatesDesc(a: string, b: string): number {
  return consultDateToTimestamp(b) - consultDateToTimestamp(a)
}
