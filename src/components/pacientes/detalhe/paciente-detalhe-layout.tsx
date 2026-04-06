import { PacienteDetalheHero } from "@/components/pacientes/detalhe/paciente-detalhe-hero"
import type { PatientDetailOutletContext } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import { PacienteDetalheTablist } from "@/components/pacientes/detalhe/paciente-detalhe-tablist"
import { getPatientDetailById } from "@/data/patient-detail-mock"
import { useMemo } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

export function PacienteDetalheLayout() {
  const { patientId } = useParams<{ patientId: string }>()
  const { pathname } = useLocation()
  const isConsultDetail = pathname.includes("/historico/consultas/")

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

  const outletContext: PatientDetailOutletContext = { detail }

  return (
    <div className="mx-auto max-w-[1600px] p-10">
      {!isConsultDetail ? <PacienteDetalheHero detail={detail} /> : null}
      {!isConsultDetail ? <PacienteDetalheTablist patientId={patientId} /> : null}
      <div className={isConsultDetail ? "w-full" : "grid grid-cols-12 gap-6"}>
        <Outlet context={outletContext} />
      </div>
    </div>
  )
}
