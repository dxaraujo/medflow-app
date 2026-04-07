import { Button, SearchField } from "@heroui/react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  MoreVertical,
  UserPlus,
} from "lucide-react"
import { fetchPatientsList } from "@/lib/api"
import { useEffect, useMemo, useState } from "react"
import { PATIENT_STATUS_BADGE, PATIENT_STATUS_LABEL, type PatientRow } from "@/data/patients-mock"
import { PageHero } from "../layout/page-hero"
import { Link, useNavigate } from "react-router-dom"

function matchesQuery(patient: PatientRow, q: string): boolean {
  const trimmed = q.trim().toLowerCase()
  if (!trimmed) return true
  const digits = trimmed.replace(/\D/g, "")
  const phoneDigits = patient.phone.replace(/\D/g, "")
  return (
    patient.name.toLowerCase().includes(trimmed) ||
    patient.id.includes(trimmed) ||
    patient.displayId.toLowerCase().includes(trimmed) ||
    (digits.length > 0 && phoneDigits.includes(digits))
  )
}

function formatCount(n: number): string {
  return n.toLocaleString("pt-BR")
}

export function PacientesPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [patients, setPatients] = useState<PatientRow[]>([])
  const [totalDirectory, setTotalDirectory] = useState(0)
  const [loadState, setLoadState] = useState<"loading" | "ok" | "error">("loading")
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchPatientsList()
      .then((data) => {
        if (cancelled) return
        setPatients(data.patients)
        setTotalDirectory(data.totalDirectory)
        setLoadState("ok")
        setLoadError(null)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setLoadState("error")
        setLoadError(e instanceof Error ? e.message : "Falha ao carregar pacientes")
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => patients.filter((p) => matchesQuery(p, query)), [patients, query])

  if (loadState === "loading") {
    return (
      <div className="mx-auto p-12">
        <PageHero
          title="Lista de Pacientes"
          subtitle="Gerencie seus prontuários e acompanhe o histórico de consultas em um ambiente sereno e organizado."
        />
        <p className="mt-8 font-body text-on-surface-variant">Carregando pacientes…</p>
      </div>
    )
  }

  if (loadState === "error") {
    return (
      <div className="mx-auto p-12">
        <PageHero
          title="Lista de Pacientes"
          subtitle="Gerencie seus prontuários e acompanhe o histórico de consultas em um ambiente sereno e organizado."
        />
        <p className="mt-8 font-body text-error">{loadError ?? "Erro ao carregar."}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto p-12">
      <PageHero
        title="Lista de Pacientes"
        subtitle="Gerencie seus prontuários e acompanhe o histórico de consultas em um ambiente sereno e organizado."/>
      <section className="mt-12 flex flex-col items-stretch gap-4 md:flex-row">
        <SearchField
          name="search"
          aria-label="Buscar pacientes"
          variant="secondary"
          onChange={(e) => setQuery(e)}
          className="w-full">
          <SearchField.Group className="flex grow items-center rounded-xl border border-outline-variant/20 bg-surface-container-low px-6 py-4 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <SearchField.SearchIcon className="size-6 shrink-0 text-outline" aria-hidden />
            <SearchField.Input placeholder="Buscar por nome, CPF ou ID do paciente..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Button
          className="h-auto min-h-14 rounded-xl px-8 py-4 font-headline text-base font-bold shadow-lg shadow-primary/20"
          variant="primary"
          onPress={() => { }}>
          <UserPlus className="size-5 shrink-0" aria-hidden />
          Novo Paciente
        </Button>
      </section>
      <div className="mt-12 rounded-xl bg-surface-container-low shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/10 p-8">
          <h2 className="font-headline text-xl font-bold text-on-surface">Diretório de Pacientes</h2>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="gap-2 px-4 py-2 font-label text-sm text-on-surface-variant hover:text-primary"
              onPress={() => { }}
            >
              <Filter className="size-4" aria-hidden />
              Filtros
            </Button>
            <Button
              variant="ghost"
              className="gap-2 px-4 py-2 font-label text-sm text-on-surface-variant hover:text-primary"
              onPress={() => { }}
            >
              <Download className="size-4" aria-hidden />
              Exportar
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                <th className="px-8 py-6">Nome do Paciente</th>
                <th className="px-8 py-6">Última Consulta</th>
                <th className="px-8 py-6">Telefone</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center font-body text-on-surface-variant">
                    Nenhum paciente encontrado para esta busca.
                  </td>
                </tr>
              ) : (
                filtered.map((patient) => (
                  <tr
                    key={patient.id}
                    className="group transition-colors hover:bg-surface-container-highest"
                  >
                    <td className="px-8 py-6">
                      <Link
                        to={`/pacientes/${patient.id}`}
                        className="flex items-center gap-4 rounded-lg outline-none transition-colors hover:bg-surface-container-high/80 focus-visible:ring-2 focus-visible:ring-primary/30"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary-container font-bold text-primary">
                          <img
                            src={patient.avatarUrl}
                            alt={patient.name}
                            className="size-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface">{patient.name}</p>
                          <p className="text-xs text-on-surface-variant">ID: {patient.displayId}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-8 py-6 font-body text-sm text-on-surface-variant">
                      {patient.lastConsultLabel}
                    </td>
                    <td className="px-8 py-6 font-body text-sm text-on-surface-variant">{patient.phone}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter ${PATIENT_STATUS_BADGE[patient.status]}`}
                      >
                        {PATIENT_STATUS_LABEL[patient.status]}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          isIconOnly
                          variant="ghost"
                          aria-label={`Abrir prontuário de ${patient.name}`}
                          className="text-outline hover:bg-white hover:text-primary"
                          onPress={() => navigate(`/pacientes/${patient.id}`)}
                        >
                          <ExternalLink className="size-5" />
                        </Button>
                        <Button
                          isIconOnly
                          variant="ghost"
                          aria-label={`Mais ações para ${patient.name}`}
                          className="text-outline hover:bg-white hover:text-primary"
                          onPress={() => { }}
                        >
                          <MoreVertical className="size-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-outline-variant/10 p-8">
          <p className="font-body text-sm text-on-surface-variant">
            Mostrando <span className="font-bold text-on-surface">{formatCount(filtered.length)}</span> de{" "}
            <span className="font-bold text-on-surface">{formatCount(totalDirectory)}</span>{" "}
            pacientes
          </p>
          <div className="flex gap-2">
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Página anterior"
              className="size-10 min-w-10 rounded-full border border-outline-variant/30 text-outline hover:border-primary hover:text-primary"
              onPress={() => { }}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="primary"
              className="size-10 min-w-10 rounded-full p-0 font-bold"
              onPress={() => { }}
            >
              1
            </Button>
            <Button
              variant="ghost"
              className="size-10 min-w-10 rounded-full p-0 font-bold text-on-surface-variant hover:bg-surface-container-highest"
              onPress={() => { }}
            >
              2
            </Button>
            <Button
              variant="ghost"
              className="size-10 min-w-10 rounded-full p-0 font-bold text-on-surface-variant hover:bg-surface-container-highest"
              onPress={() => { }}
            >
              3
            </Button>
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Próxima página"
              className="size-10 min-w-10 rounded-full border border-outline-variant/30 text-outline hover:border-primary hover:text-primary"
              onPress={() => { }}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
