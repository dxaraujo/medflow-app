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
  fullName: string
  cpf: string
  birthDate: string
  gender: string
  motherName: string
  email: string
  whatsappPhone: string
  emergencyContact: string
  emergencyPhone: string
  address: {
    street: string
    number: string
    complement: string
    district: string
    city: string
    state: string
    zipCode: string
  }
  insurance: {
    planName: string
    cardNumber: string
    validUntil: string
  }
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

/** Diagnóstico na consulta (CID-10 opcional). */
export type PatientConsultDiagnosis = {
  cid10?: string
  label: string
  type: "principal" | "secundario"
}

/** Metadados do atendimento (protótipo). */
export type PatientConsultMetadata = {
  specialty?: string
  unit?: string
  crm?: string
  visitType?: string
  startedAt?: string
}

/** Prontuário completo de uma consulta (ambulatorial). */
export type PatientConsultRecord = {
  id: string
  dateLabel: string
  professional: string
  metadata: PatientConsultMetadata
  chiefComplaint: string
  historyOfPresentIllness: string
  reviewOfSystems?: string
  pastMedicalHistory?: string
  familyHistory?: string
  medicationsAtVisit?: string
  allergiesSnapshot?: string[]
  vitalsAtVisit: PatientVital[]
  physicalExam: string
  diagnoses: PatientConsultDiagnosis[]
  clinicalNotes: string
  plan: string
  linkedPrescriptionIds?: string[]
  linkedExamIds?: string[]
  documentsNote?: string
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
  age: string
  gender: string
  cpf: string
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
    fullName: "Helena Bittencourt de Oliveira",
    cpf: "042.883.912-44",
    birthDate: "14/03/1978",
    gender: "Feminino",
    motherName: "Maria Eduarda Bittencourt",
    email: "helena.souza@email.com",
    whatsappPhone: "(21) 98842-1203",
    emergencyContact: "Mariana Souza (filha)",
    emergencyPhone: "(11) 98888-7766",
    address: {
      street: "Rua das Laranjeiras",
      number: "452",
      complement: "Apto 302 - Bloco B",
      district: "Laranjeiras",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "22240-006",
    },
    insurance: {
      planName: "Unimed Nacional - Diamante",
      cardNumber: "0 034 991204423 001",
      validUntil: "12/2025",
    },
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
    age: "46",
    gender: "Feminino",
    cpf: "042.883.912-44",
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
      fullName: row.name,
      cpf: "***.***.***-**",
      birthDate: "—",
      gender: "—",
      motherName: "—",
      email: "—",
      whatsappPhone: "—",
      emergencyContact: "—",
      emergencyPhone: "—",
      address: {
        street: "—",
        number: "—",
        complement: "—",
        district: "—",
        city: "—",
        state: "—",
        zipCode: "—",
      },
      insurance: {
        planName: "—",
        cardNumber: "—",
        validUntil: "—",
      },
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
      age: "—",
      gender: "—",
      cpf: "***.***.***-**",
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
      cpf: "***.***.***-21",
      email: "ricardo.costa@email.com",
      gender: "Masculino",
      fullName: "Ricardo Costa",
    },
    evolution: DETAIL_84920.evolution.slice(0, 2),
    consults: DETAIL_84920.consults.slice(0, 2),
    prescriptions: DETAIL_84920.prescriptions.slice(0, 2),
    exams: DETAIL_84920.exams.slice(0, 2),
    timelineEvents: sortTimelineRecentFirst([
      ...BASE_TIMELINE_84920.map((e) => ({ ...e, id: `${e.id}-84921` })),
    ]),
    hero: {
      age: "40",
      gender: "Masculino",
      cpf: "***.***.***-23",
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
      cpf: "***.***.***-22",
      email: "beatriz.fonseca@email.com",
      fullName: "Beatriz Fonseca",
    },
    evolution: DETAIL_84920.evolution.slice(0, 2),
    consults: DETAIL_84920.consults.slice(0, 2),
    prescriptions: [DETAIL_84920.prescriptions[0]!],
    exams: [DETAIL_84920.exams[0]!],
    timelineEvents: sortTimelineRecentFirst(BASE_TIMELINE_84920.slice(0, 4)),
    hero: {
      age: "33",
      gender: "Feminino",
      cpf: "***.***.***-23",
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
      cpf: "***.***.***-23",
      email: "luisa.m@email.com",
      fullName: "Luisa Maria",
    },
    evolution: [],
    consults: [],
    prescriptions: [],
    exams: [],
    timelineEvents: [],
    hero: {
      age: "61",
      gender: "Feminino",
      cpf: "***.***.***-23",
      clinicalNoteDraft: "",
      clinicalNoteMeta: "Paciente inativo — sem edições recentes",
    },
  },
}

function synthesizeConsultRecord(row: PatientConsultHistoryRow): PatientConsultRecord {
  return {
    id: row.id,
    dateLabel: row.date,
    professional: row.professional,
    metadata: {},
    chiefComplaint: row.reason,
    historyOfPresentIllness:
      "Registro resumido no sistema. O detalhamento completo do prontuário não está disponível neste protótipo.",
    physicalExam: "—",
    vitalsAtVisit: [],
    diagnoses: [{ type: "principal", label: row.summary }],
    clinicalNotes: "—",
    plan: "—",
  }
}

const CONSULT_RECORDS_BASE: Record<string, PatientConsultRecord> = {
  c1: {
    id: "c1",
    dateLabel: "12 Out, 2023",
    professional: "Dra. Liana Barbosa",
    metadata: {
      specialty: "Clínica Médica / Hipertensão",
      unit: "Ambulatório — Unidade Centro",
      crm: "52.12345-RJ",
      visitType: "Retorno",
      startedAt: "12 Out, 2023 — 14:30",
    },
    chiefComplaint: "Acompanhamento de hipertensão arterial sistêmica em uso de losartana.",
    historyOfPresentIllness:
      "Paciente em acompanhamento regular. Refere adesão ao tratamento, dieta hipossódica parcialmente seguida. Nega cefaleia, palpitações, dispneia aos esforços habituais ou edema em membros inferiores. Dorme 6–7 h/noite. Atividade física leve 2x/semana.",
    reviewOfSystems:
      "Cardiovascular: nega dor torácica. Respiratório: nega tosse ou dispneia em repouso. Digestivo: evacuações normais. Neurológico: nega parestesias ou déficits.",
    pastMedicalHistory: "HAS há 8 anos; dislipidemia em controle; nega DM.",
    familyHistory: "Pai com IAM aos 62 anos; mãe hipertensa.",
    medicationsAtVisit: "Losartana 50 mg 1x manhã; sinvastatina 20 mg 1x noite (conforme prescrição vigente).",
    allergiesSnapshot: ["Penicilina — urticária", "Dipirona — broncoespasmo"],
    vitalsAtVisit: [
      {
        id: "cv1",
        label: "Pressão arterial",
        value: "128",
        unit: "x 82 mmHg",
        capturedAtLabel: "Consulta",
      },
      { id: "cv2", label: "Freq. cardíaca", value: "72", unit: "bpm", capturedAtLabel: "Consulta" },
      { id: "cv3", label: "Temperatura", value: "36,4", unit: "°C", capturedAtLabel: "Consulta" },
      { id: "cv4", label: "SpO₂", value: "98", unit: "%", capturedAtLabel: "Consulta" },
      { id: "cv5", label: "Peso", value: "68", unit: "kg", capturedAtLabel: "Consulta" },
      { id: "cv6", label: "Altura", value: "1,64", unit: "m", capturedAtLabel: "Consulta" },
    ],
    physicalExam:
      "Estado geral: bom. Corado, hidratado, acianótico, anictérico. PA 128x82 mmHg, FC 72 bpm regular. ACV: bulhas rítmicas, sem sopros. AR: murmúrio vesicular presente, sem ruídos adventícios. MMII: sem edema; pulsos pediosos presentes.",
    diagnoses: [
      { type: "principal", cid10: "I10", label: "Hipertensão essencial (primária)" },
      { type: "secundario", cid10: "E78.5", label: "Dislipidemia, não especificada" },
    ],
    clinicalNotes:
      "**S:** refere estar bem, sem queixas agudas.\n**O:** PA controlada; exame físico sem alterações relevantes.\n**A:** HAS estável; risco cardiovascular moderado.\n**P:** manter esquema atual; reforçar dieta e exercício; retorno em 90 dias ou antes se sintomas.",
    plan: "Manter losartana e sinvastatina. Orientar dieta hipossódica e atividade física moderada. Solicitar perfil lipídico em 6 meses se não realizado.",
    linkedPrescriptionIds: ["p1", "p2"],
    linkedExamIds: ["x1"],
    documentsNote: "Orientações por escrito entregues ao paciente. Sem atestado nesta data.",
  },
  c2: {
    id: "c2",
    dateLabel: "05 Out, 2023",
    professional: "Dra. Liana Barbosa",
    metadata: {
      specialty: "Clínica Médica",
      unit: "Ambulatório — Unidade Centro",
      crm: "52.12345-RJ",
      visitType: "Consulta agendada",
      startedAt: "05 Out, 2023 — 09:15",
    },
    chiefComplaint: "Cefaleia holocraniana há 3 dias, intensidade leve a moderada.",
    historyOfPresentIllness:
      "Início gradual, sem fotofobia ou rigidez de nuca. Nega febre. Relaciona com noites mal dormidas e estresse laboral. Não usou analgésicos de forma regular.",
    reviewOfSystems: "Neurológico: nega déficit motor ou sensitivo. ENT: nega otalgia.",
    pastMedicalHistory: "HAS; nega trauma craniano recente.",
    familyHistory: "Sem histórico de migrânea.",
    medicationsAtVisit: "Losartana 50 mg; uso ocasional de dipirona evitado (alergia).",
    allergiesSnapshot: ["Penicilina — urticária", "Dipirona — broncoespasmo"],
    vitalsAtVisit: [
      { id: "cv1", label: "Pressão arterial", value: "126", unit: "x 80 mmHg", capturedAtLabel: "Consulta" },
      { id: "cv2", label: "Freq. cardíaca", value: "76", unit: "bpm", capturedAtLabel: "Consulta" },
      { id: "cv3", label: "Temperatura", value: "36,2", unit: "°C", capturedAtLabel: "Consulta" },
    ],
    physicalExam:
      "Paciente lúcida, orientada. Pescoço sem rigidez. Fundoscopia não realizada nesta unidade. Sinus pernas livres.",
    diagnoses: [
      { type: "principal", cid10: "R51", label: "Cefaleia" },
      { type: "secundario", cid10: "I10", label: "Hipertensão essencial (primária) — estável" },
    ],
    clinicalNotes:
      "Cefaleia tensional provável, contexto de sono e estresse. Excluir sinais de alarme neste momento.",
    plan: "Hidratação, higiene do sono, analgésico alternativo à dipirona conforme lista da instituição. Retorno se piora ou déficit neurológico.",
    linkedPrescriptionIds: ["p1"],
    linkedExamIds: [],
    documentsNote: "Nenhum documento adicional.",
  },
  c3: {
    id: "c3",
    dateLabel: "28 Set, 2023",
    professional: "Dr. Paulo Nunes",
    metadata: {
      specialty: "Cirurgia Geral",
      unit: "Ambulatório — Unidade Sul",
      crm: "48.99887-RJ",
      visitType: "Pós-operatório",
      startedAt: "28 Set, 2023 — 11:00",
    },
    chiefComplaint: "Retorno pós-operatório para avaliação de ferida operatória.",
    historyOfPresentIllness:
      "Colecistectomia videolaparoscópica há 21 dias. Refere melhora progressiva da dor abdominal. Nega febre, náuseas ou secreção purulenta no sítio cirúrgico.",
    pastMedicalHistory: "Litíase biliar; HAS em uso de IECA (suspensa no perioperatório, reiniciada).",
    familyHistory: "Sem alterações relevantes.",
    medicationsAtVisit: "Analgésico conforme prescrição de alta; losartana reiniciada há 1 semana.",
    allergiesSnapshot: ["Penicilina — urticária"],
    vitalsAtVisit: [
      { id: "cv1", label: "Pressão arterial", value: "122", unit: "x 78 mmHg", capturedAtLabel: "Consulta" },
      { id: "cv2", label: "Temperatura", value: "36,5", unit: "°C", capturedAtLabel: "Consulta" },
    ],
    physicalExam:
      "Abdome plano, flácido, indolor à palpação superficial e profunda. Ferida operatória limpa, sem hiperemia ou deiscência. Sem massas palpáveis.",
    diagnoses: [
      { type: "principal", cid10: "Z48.8", label: "Cuidado pós-operatório, seguimento" },
      { type: "secundario", cid10: "K80.1", label: "Cálculo da vesícula biliar com colecistite — tratado" },
    ],
    clinicalNotes: "Evolução pós-operatória satisfatória. Paciente orientado sobre sinais de alarme.",
    plan: "Liberar atividades leves; retorno se dor intensa, febre ou sangramento.",
    linkedPrescriptionIds: [],
    linkedExamIds: ["x2"],
    documentsNote: "Declaração de comparecimento disponível na recepção.",
  },
}

const CONSULT_RECORDS_BY_PATIENT: Record<string, Record<string, PatientConsultRecord>> = {
  "84920": CONSULT_RECORDS_BASE,
  "84921": { c1: CONSULT_RECORDS_BASE.c1, c2: CONSULT_RECORDS_BASE.c2 },
  "84922": { c1: CONSULT_RECORDS_BASE.c1, c2: CONSULT_RECORDS_BASE.c2 },
}

export function getConsultRecord(patientId: string, consultId: string): PatientConsultRecord | null {
  const detail = getPatientDetailById(patientId)
  if (!detail) return null
  const row = detail.consults.find((c) => c.id === consultId)
  if (!row) return null
  const full = CONSULT_RECORDS_BY_PATIENT[patientId]?.[consultId]
  return full ?? synthesizeConsultRecord(row)
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

