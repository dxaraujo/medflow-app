import { PATIENTS_MOCK, type PatientRow } from "@/data/patients-mock"

export type PatientDetailTabId =
  | "dados_pessoais"
  | "evolucao"
  | "historico"
  | "prescricoes"
  | "exames"

export type PatientTimelineEventType = "consulta" | "evolucao" | "prescricao" | "exame" | "alerta"

export type PatientVital = {
  id: string
  label: string
  value: string
  unit?: string
  capturedAtLabel: string
}

export type PatientAllergy = {
  id: string
  substance: string
  reaction?: string
}

export type PatientAlert = {
  id: string
  title: string
  description: string
}

export type PatientAnnotation = {
  id: string
  atLabel: string
  author: string
  text: string
}

export type PatientPersonalData = {
  birthDate: string
  cpfMasked: string
  email: string
  address: string
  insurance: string
  emergencyContact: string
  emergencyPhone: string
}

export type PatientEvolutionEntry = {
  id: string
  dateLabel: string
  text: string
}

export type PatientConsultHistoryRow = {
  id: string
  date: string
  professional: string
  reason: string
  summary: string
}

export type PatientPrescriptionRow = {
  id: string
  drug: string
  dose: string
  frequency: string
  start: string
  end?: string
  status: string
}

export type PatientExamRow = {
  id: string
  name: string
  date: string
  status: "solicitado" | "realizado" | "pendente"
  resultSummary: string
}

export type PatientTimelineEvent = {
  id: string
  at: string
  type: PatientTimelineEventType
  title: string
  summary: string
  relatedTab?: PatientDetailTabId
}

export type PatientHeroMeta = {
  ageGenderLabel: string
  /** Texto inicial do editor de evolução (protótipo). */
  clinicalNoteDraft: string
  /** Rodapé tipo “Última alteração: …”. */
  clinicalNoteMeta?: string
}

export type PatientDetail = {
  summary: PatientRow
  hero: PatientHeroMeta
  vitals: PatientVital[]
  allergies: PatientAllergy[]
  alerts: PatientAlert[]
  annotations: PatientAnnotation[]
  personal: PatientPersonalData
  evolution: PatientEvolutionEntry[]
  consults: PatientConsultHistoryRow[]
  prescriptions: PatientPrescriptionRow[]
  exams: PatientExamRow[]
  timelineEvents: PatientTimelineEvent[]
}

const BASE_TIMELINE_84920: PatientTimelineEvent[] = [
  {
    id: "t1",
    at: "2023-10-12T14:30:00",
    type: "consulta",
    title: "Consulta — rotina",
    summary: "Acompanhamento hipertensão; PA controlada.",
    relatedTab: "historico",
  },
  {
    id: "t2",
    at: "2023-10-12T14:05:00",
    type: "evolucao",
    title: "Evolução clínica",
    summary: "Paciente refere adesão ao tratamento; sem queixas agudas.",
    relatedTab: "evolucao",
  },
  {
    id: "t3",
    at: "2023-10-05T09:00:00",
    type: "prescricao",
    title: "Prescrição ajustada",
    summary: "Losartana 50 mg — manhã.",
    relatedTab: "prescricoes",
  },
  {
    id: "t4",
    at: "2023-10-01T11:20:00",
    type: "exame",
    title: "Hemograma completo",
    summary: "Resultado dentro dos parâmetros esperados.",
    relatedTab: "exames",
  },
  {
    id: "t5",
    at: "2023-09-20T08:00:00",
    type: "alerta",
    title: "Alerta — interação",
    summary: "Verificar uso concomitante de AINE com IECA.",
    relatedTab: "prescricoes",
  },
]

function sortTimelineRecentFirst(events: PatientTimelineEvent[]): PatientTimelineEvent[] {
  return [...events].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
}

const DETAIL_84920: Omit<PatientDetail, "summary"> = {
  vitals: [
    { id: "v1", label: "Pressão arterial", value: "128", unit: "x 82 mmHg", capturedAtLabel: "Hoje, 08:10" },
    { id: "v2", label: "Freq. cardíaca", value: "72", unit: "bpm", capturedAtLabel: "Hoje, 08:10" },
    { id: "v3", label: "Temperatura", value: "36,4", unit: "°C", capturedAtLabel: "Hoje, 08:08" },
    { id: "v4", label: "SpO₂", value: "98", unit: "%", capturedAtLabel: "Hoje, 08:10" },
    { id: "v5", label: "Peso", value: "68", unit: "kg", capturedAtLabel: "11 Out, 2023" },
    { id: "v6", label: "Altura", value: "1,64", unit: "m", capturedAtLabel: "11 Out, 2023" },
  ],
  allergies: [
    { id: "a1", substance: "Penicilina", reaction: "Urticária" },
    { id: "a2", substance: "Dipirona", reaction: "Broncoespasmo" },
  ],
  alerts: [
    {
      id: "al1",
      title: "Risco de queda",
      description: "Uso de benzodiazepínico noturno — orientar cuidados ao deambular.",
    },
  ],
  annotations: [
    {
      id: "n1",
      atLabel: "10 Out, 2023",
      author: "Dra. Liana Barbosa",
      text: "Reforçar dieta hipossódica na próxima consulta. Paciente demonstrou boa compreensão.",
    },
    {
      id: "n2",
      atLabel: "28 Set, 2023",
      author: "Enf. Carla M.",
      text: "Telefone alternativo da filha atualizado no cadastro.",
    },
  ],
  personal: {
    birthDate: "14/03/1978",
    cpfMasked: "***.***.***-20",
    email: "helena.souza@email.com",
    address: "Rua das Acácias, 120 — Jardim Paulista, São Paulo — SP",
    insurance: "Unimed — Plano Enfermaria",
    emergencyContact: "Mariana Souza (filha)",
    emergencyPhone: "(11) 98888-7766",
  },
  evolution: [
    {
      id: "e1",
      dateLabel: "12 Out, 2023",
      text: "S: refere estar bem, sem edema em MMII. O: PA 128x82, FC 72, ausência de sopros. A: HAS estável. P: manter losartana; retorno em 90 dias.",
    },
    {
      id: "e2",
      dateLabel: "05 Out, 2023",
      text: "Retorno antecipado por cefaleia leve. Exame físico sem alterações; orientação sobre hidratação e sono.",
    },
    {
      id: "e3",
      dateLabel: "15 Set, 2023",
      text: "Primeira consulta do ano; revisão de exames anuais. LDL limítrofe — encaminhada orientação nutricional.",
    },
  ],
  consults: [
    {
      id: "c1",
      date: "12 Out, 2023",
      professional: "Dra. Liana Barbosa",
      reason: "Rotina / HAS",
      summary: "PA controlada; mantida prescrição.",
    },
    {
      id: "c2",
      date: "05 Out, 2023",
      professional: "Dra. Liana Barbosa",
      reason: "Cefaleia",
      summary: "Sintoma leve; observação.",
    },
    {
      id: "c3",
      date: "28 Set, 2023",
      professional: "Dr. Paulo Nunes",
      reason: "Pós-operatório",
      summary: "Cicatrização adequada.",
    },
  ],
  prescriptions: [
    {
      id: "p1",
      drug: "Losartana potássica",
      dose: "50 mg",
      frequency: "1x ao dia (manhã)",
      start: "05 Out, 2023",
      status: "Ativa",
    },
    {
      id: "p2",
      drug: "Sinvastatina",
      dose: "20 mg",
      frequency: "1x ao dia (noite)",
      start: "15 Set, 2023",
      end: "—",
      status: "Ativa",
    },
    {
      id: "p3",
      drug: "Vitamina D",
      dose: "7.000 UI",
      frequency: "1x por semana",
      start: "01 Set, 2023",
      end: "30 Nov, 2023",
      status: "Encerrada",
    },
  ],
  exams: [
    {
      id: "x1",
      name: "Hemograma completo",
      date: "01 Out, 2023",
      status: "realizado",
      resultSummary: "Sem alterações significativas.",
    },
    {
      id: "x2",
      name: "Perfil lipídico",
      date: "02 Out, 2023",
      status: "pendente",
      resultSummary: "Aguardando coleta.",
    },
    {
      id: "x3",
      name: "ECG de repouso",
      date: "12 Out, 2023",
      status: "solicitado",
      resultSummary: "—",
    },
  ],
  hero: {
    ageGenderLabel: "46 anos • Feminino",
    clinicalNoteDraft:
      "Queixa principal: acompanhamento de HAS em uso regular de losartana.\n\nAnamnese: refere estar bem, sem edema em membros inferiores, sem cefaleia ou palpitações. Nega dispneia aos esforços habituais.\n\nConduta: manter medicação atual; reforçar dieta hipossódica e atividade física moderada. Retorno em 90 dias ou antes se sintomas.",
    clinicalNoteMeta: "Última alteração: há 2 min por Dra. Liana Barbosa",
  },
  timelineEvents: sortTimelineRecentFirst(BASE_TIMELINE_84920),
}

function minimalDetail(row: PatientRow): PatientDetail {
  return {
    summary: row,
    vitals: [
      { id: "v1", label: "Pressão arterial", value: "—", capturedAtLabel: "Sem registro recente" },
      { id: "v2", label: "Freq. cardíaca", value: "—", capturedAtLabel: "Sem registro recente" },
      { id: "v3", label: "Temperatura", value: "—", capturedAtLabel: "Sem registro recente" },
      { id: "v4", label: "SpO₂", value: "—", capturedAtLabel: "Sem registro recente" },
    ],
    allergies: [],
    alerts: [],
    annotations: [],
    personal: {
      birthDate: "—",
      cpfMasked: "***.***.***-**",
      email: "—",
      address: "—",
      insurance: "—",
      emergencyContact: "—",
      emergencyPhone: "—",
    },
    evolution: [],
    consults: [
      {
        id: "c1",
        date: row.lastConsultLabel,
        professional: "—",
        reason: "Último registro",
        summary: "Consultar prontuário completo.",
      },
    ],
    prescriptions: [],
    exams: [],
    timelineEvents: sortTimelineRecentFirst([
      {
        id: "t1",
        at: new Date().toISOString(),
        type: "consulta",
        title: "Última consulta registrada",
        summary: row.lastConsultLabel,
        relatedTab: "historico",
      },
    ]),
    hero: {
      ageGenderLabel: "—",
      clinicalNoteDraft: "",
      clinicalNoteMeta: row.lastConsultLabel
        ? `Último registro em prontuário: ${row.lastConsultLabel}`
        : undefined,
    },
  }
}

const EXTENDED: Record<string, Omit<PatientDetail, "summary">> = {
  "84920": DETAIL_84920,
  "84921": {
    ...DETAIL_84920,
    vitals: DETAIL_84920.vitals.map((v, i) =>
      i === 0 ? { ...v, value: "118", unit: "x 76 mmHg" } : v,
    ),
    allergies: [{ id: "a1", substance: "Frutos do mar", reaction: "Angioedema" }],
    alerts: [
      {
        id: "al1",
        title: "Acompanhamento psicológico",
        description: "Retorno semanal sugerido pela equipe multidisciplinar.",
      },
    ],
    annotations: [
      {
        id: "n1",
        atLabel: "04 Out, 2023",
        author: "Dra. Liana Barbosa",
        text: "Paciente em pausa temporária de atividade física intensa.",
      },
    ],
    personal: {
      ...DETAIL_84920.personal,
      birthDate: "22/07/1985",
      cpfMasked: "***.***.***-21",
      email: "ricardo.costa@email.com",
    },
    evolution: DETAIL_84920.evolution.slice(0, 2),
    consults: DETAIL_84920.consults.slice(0, 2),
    prescriptions: DETAIL_84920.prescriptions.slice(0, 2),
    exams: DETAIL_84920.exams.slice(0, 2),
    timelineEvents: sortTimelineRecentFirst([
      ...BASE_TIMELINE_84920.map((e) => ({ ...e, id: `${e.id}-84921` })),
    ]),
    hero: {
      ageGenderLabel: "40 anos • Masculino",
      clinicalNoteDraft:
        DETAIL_84920.evolution[0]?.text ??
        "Descreva a queixa principal, anamnese e conduta...",
      clinicalNoteMeta: "Última alteração: 04 Out, 2023 por Dra. Liana Barbosa",
    },
  },
  "84922": {
    ...DETAIL_84920,
    allergies: [],
    alerts: [],
    annotations: DETAIL_84920.annotations.slice(0, 1),
    personal: {
      ...DETAIL_84920.personal,
      birthDate: "03/11/1992",
      cpfMasked: "***.***.***-22",
      email: "beatriz.fonseca@email.com",
    },
    evolution: DETAIL_84920.evolution.slice(0, 2),
    consults: DETAIL_84920.consults.slice(0, 2),
    prescriptions: [DETAIL_84920.prescriptions[0]!],
    exams: [DETAIL_84920.exams[0]!],
    timelineEvents: sortTimelineRecentFirst(BASE_TIMELINE_84920.slice(0, 4)),
    hero: {
      ageGenderLabel: "33 anos • Feminino",
      clinicalNoteDraft:
        DETAIL_84920.evolution[0]?.text ??
        "Descreva a queixa principal, anamnese e conduta...",
      clinicalNoteMeta: undefined,
    },
  },
  "84923": {
    ...DETAIL_84920,
    vitals: DETAIL_84920.vitals.map((v) => ({ ...v, value: "—", unit: undefined, capturedAtLabel: "Inativo" })),
    allergies: [],
    alerts: [],
    annotations: [],
    personal: {
      ...DETAIL_84920.personal,
      birthDate: "09/01/1965",
      cpfMasked: "***.***.***-23",
      email: "luisa.m@email.com",
    },
    evolution: [],
    consults: [],
    prescriptions: [],
    exams: [],
    timelineEvents: [],
    hero: {
      ageGenderLabel: "61 anos • Feminino",
      clinicalNoteDraft: "",
      clinicalNoteMeta: "Paciente inativo — sem edições recentes",
    },
  },
}

export function getPatientDetailById(patientId: string): PatientDetail | undefined {
  const row = PATIENTS_MOCK.find((p) => p.id === patientId)
  if (!row) return undefined
  const extra = EXTENDED[patientId]
  if (extra) {
    return { summary: row, ...extra }
  }
  return minimalDetail(row)
}

