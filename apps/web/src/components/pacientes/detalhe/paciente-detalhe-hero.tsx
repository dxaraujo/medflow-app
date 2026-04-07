import type { PatientDetail } from "@/data/patient-detail-mock"
import { PATIENT_STATUS_BADGE, PATIENT_STATUS_LABEL } from "@/data/patients-mock"
import { Button } from "@heroui/react"
import { ArrowLeft, Cake, Fingerprint, Printer, Save, Venus } from "lucide-react"
import { Link } from "react-router-dom"

type PacienteDetalheHeroProps = {
  detail: PatientDetail
}

export function PacienteDetalheHero({ detail }: PacienteDetalheHeroProps) {
  const { summary, hero } = detail

  return (
    <header className="mb-10 space-y-8 md:mb-12">
      <Link to="/pacientes" className="inline-flex w-fit items-center gap-2 rounded-full px-2 py-1 font-label text-sm text-on-surface-variant transition-colors hover:text-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/30">
        <ArrowLeft className="size-4" aria-hidden />Voltar para lista
      </Link>

      <div className="flex items-center gap-6 justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md ring-4 ring-white">
            <img
              alt={summary.name}
              className="h-full w-full object-cover"
              src={summary.avatarUrl}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{summary.name}</h1>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${PATIENT_STATUS_BADGE[summary.status]}`}>{PATIENT_STATUS_LABEL[summary.status]}</span>
            </div>
            <div className="flex gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-2"><Cake className="size-5" aria-hidden />{hero.age}</span>
              <span className="flex items-center gap-2"><Venus className="size-5" aria-hidden />{hero.gender}</span>
              <span className="flex items-center gap-2"><Fingerprint className="size-5" aria-hidden />{hero.cpf}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto md:justify-end">
          <Button variant="secondary" className="rounded-full border border-outline-variant/20 bg-surface-container-lowest px-6 py-3 font-semibold text-primary shadow-sm transition-transform active:scale-95" onPress={() => { }}>
            <Printer className="size-4" aria-hidden />Imprimir
          </Button>
          <Button variant="primary" className="rounded-full bg-linear-to-r from-primary to-primary-container px-8 py-3 font-semibold shadow-lg shadow-primary/10 transition-transform active:scale-95" onPress={() => { }}>
            <Save className="size-4" aria-hidden />Salvar prontuário
          </Button>
        </div>
      </div>
    </header>
  )
}
