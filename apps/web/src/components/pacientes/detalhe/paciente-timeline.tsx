import type { PatientTimelineEvent, PatientTimelineEventType } from "@/data/patient-detail-mock"

const TYPE_LABEL: Record<PatientTimelineEventType, string> = {
  consulta: "Consulta",
  evolucao: "Evolução",
  prescricao: "Prescrição",
  exame: "Exame",
  alerta: "Alerta",
}

const TYPE_DOT: Record<PatientTimelineEventType, string> = {
  consulta: "bg-primary",
  evolucao: "bg-primary-container",
  prescricao: "bg-on-secondary-container",
  exame: "bg-tertiary-container",
  alerta: "bg-error",
}

function formatWhen(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const MONTHS_PT = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
] as const

function formatBentoDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const day = d.getDate().toString().padStart(2, "0")
  const mon = MONTHS_PT[d.getMonth()] ?? ""
  const y = d.getFullYear()
  return `${day} ${mon} ${y}`
}

type PacienteTimelineProps = {
  events: PatientTimelineEvent[]
  /** Layout alinhado ao protótipo `paciente.html` (coluna direita). */
  layout?: "default" | "bento"
}

export function PacienteTimeline({ events, layout = "default" }: PacienteTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 text-center font-body text-sm text-on-surface-variant">
        Nenhum evento na linha do tempo.
      </div>
    )
  }

  if (layout === "bento") {
    return (
      <div className="flex-1 rounded-2xl bg-surface-container-low p-6">
        <h3 className="mb-8 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Evolução temporal
        </h3>
        <div className="space-y-12 border-l-2 border-outline-variant/30 pl-4">
          {events.map((ev, index) => {
            const isFirst = index === 0
            return (
              <div
                key={ev.id}
                className={`relative ${isFirst ? "" : "opacity-60"}`}
              >
                <div
                  className={`absolute -left-8.5 top-0 size-4 rounded-full border-4 border-white ${
                    isFirst ? "bg-primary" : "bg-outline-variant"
                  }`}
                  aria-hidden
                />
                <p
                  className={`mb-1 text-xs font-bold ${isFirst ? "text-primary" : "text-on-surface-variant"}`}
                >
                  {formatBentoDate(ev.at)}
                </p>
                <h4 className="text-sm font-bold text-on-surface">{ev.title}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">{ev.summary}</p>
                <span className="mt-1 inline-block font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/80">
                  {TYPE_LABEL[ev.type]}
                </span>
                {isFirst ? (
                  <button
                    type="button"
                    className="mt-2 text-xs font-bold text-primary hover:underline"
                  >
                    Ver detalhes
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm">
      <h3 className="font-headline text-lg font-bold text-on-surface">Evolução temporal</h3>
      <p className="mt-1 font-label text-xs uppercase tracking-widest text-on-surface-variant">
        Mais recentes primeiro
      </p>
      <ul className="relative mt-6 space-y-0 pl-2" aria-label="Linha do tempo clínica">
        {events.map((ev, index) => (
          <li key={ev.id} className="relative flex gap-4 pb-8 last:pb-0">
            {index < events.length - 1 ? (
              <span
                className="absolute left-[11px] top-6 h-[calc(100%-0.5rem)] w-px bg-outline-variant/30"
                aria-hidden
              />
            ) : null}
            <span
              className={`relative z-10 mt-1 size-3 shrink-0 rounded-full ring-4 ring-surface-container-low ${TYPE_DOT[ev.type]}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-label text-[10px] font-bold uppercase tracking-wider text-primary">
                  {TYPE_LABEL[ev.type]}
                </span>
                <time className="font-body text-xs text-on-surface-variant" dateTime={ev.at}>
                  {formatWhen(ev.at)}
                </time>
              </div>
              <p className="mt-1 font-headline text-sm font-semibold text-on-surface">{ev.title}</p>
              <p className="mt-0.5 font-body text-sm text-on-surface-variant">{ev.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
