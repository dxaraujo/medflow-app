import { PacienteDetalheHero } from "@/components/pacientes/detalhe/paciente-detalhe-hero"
import { PacienteDetalhePainel } from "@/components/pacientes/detalhe/paciente-detalhe-painel"
import { PacienteDetalheTablist } from "@/components/pacientes/detalhe/paciente-detalhe-tablist"
import { getPatientDetailById, type PatientDetailTabId } from "@/data/patient-detail-mock"
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

export function PacienteDetalhePage() {
  const { patientId } = useParams<{ patientId: string }>()
  const [tab, setTab] = useState<PatientDetailTabId>("evolucao")

  const detail = useMemo(
    () => (patientId ? getPatientDetailById(patientId) : undefined),
    [patientId],
  )

  if (!patientId || !detail) {
    return (
      <div className="mx-auto max-w-7xl p-12">
        <p className="font-body text-lg text-on-surface-variant">Paciente não encontrado.</p>
        <Link
          to="/pacientes"
          className="mt-4 inline-block font-label text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Voltar para lista de pacientes
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px] p-10">
      <PacienteDetalheHero detail={detail} />
      <PacienteDetalheTablist value={tab} onChange={setTab} />
      <PacienteDetalhePainel tab={tab} detail={detail} />
    </div>
  )
}
