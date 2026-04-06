import { Button } from "@heroui/react"
import { ArrowLeft, Printer, Save } from "lucide-react"
import { Link } from "react-router-dom"
import { PATIENT_STATUS_BADGE, PATIENT_STATUS_LABEL } from "@/data/patients-mock"
import type { PatientDetail } from "@/data/patient-detail-mock"

type PacienteDetalheHeroProps = {
  detail: PatientDetail
}

export function PacienteDetalheHero({ detail }: PacienteDetalheHeroProps) {
  const { summary, hero } = detail

  return (
    <header className="mb-10 space-y-8 md:mb-12">
      <Link
        to="/pacientes"
        className="inline-flex w-fit items-center gap-2 rounded-full px-2 py-1 font-label text-sm text-on-surface-variant transition-colors hover:text-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para lista
      </Link>

      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={summary.avatarUrl}
              alt=""
              className="size-24 rounded-full object-cover ring-4 ring-[#cde5ff]"
            />
            <span
              className="absolute bottom-1 right-1 size-5 rounded-full border-2 border-white bg-emerald-500"
              aria-hidden
              title="Status"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
              {summary.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary-container px-3 py-1 font-label text-xs font-medium uppercase tracking-wider text-on-secondary">
                {hero.ageGenderLabel}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter ${PATIENT_STATUS_BADGE[summary.status]}`}
              >
                {PATIENT_STATUS_LABEL[summary.status]}
              </span>
            </div>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
              ID {summary.displayId} · {summary.phone}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-3 md:w-auto md:justify-end">
          <Button
            variant="secondary"
            className="rounded-full border border-outline-variant/20 bg-surface-container-lowest px-6 py-3 font-semibold text-primary shadow-sm transition-transform active:scale-95"
            onPress={() => {}}
          >
            <Printer className="size-4" aria-hidden />
            Imprimir
          </Button>
          <Button
            variant="primary"
            className="rounded-full bg-linear-to-r from-primary to-primary-container px-8 py-3 font-semibold shadow-lg shadow-primary/10 transition-transform active:scale-95"
            onPress={() => {}}
          >
            <Save className="size-4" aria-hidden />
            Salvar prontuário
          </Button>
        </div>
      </div>
    </header>
  )
}
