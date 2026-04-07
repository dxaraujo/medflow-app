import { Injectable } from "@nestjs/common"
import type { Document } from "mongodb"
import { COLLECTIONS } from "../collections"
import { MongoService } from "../mongo/mongo.service"

type PatientRowDoc = Document & {
  patientId: string
  detail: { summary: unknown }
}

type PatientFullDoc = Document & {
  patientId: string
  detail: unknown
}

type ConsultRecordDoc = Document & {
  patientId: string
  consultId: string
  record: unknown
}

const DEFAULT_TOTAL = 1284

type ConfigRow = Document & { _id: string; patientsTotalDirectory?: number }

@Injectable()
export class PatientsService {
  constructor(private readonly mongo: MongoService) {}

  async listSummaries(): Promise<unknown[]> {
    const db = this.mongo.getDb()
    const rows = await db
      .collection<PatientRowDoc>(COLLECTIONS.patients)
      .find({}, { projection: { _id: 0, "detail.summary": 1, patientId: 1 } })
      .toArray()
    return rows.map((r) => r.detail.summary)
  }

  async getTotalDirectory(): Promise<number> {
    const db = this.mongo.getDb()
    const doc = await db.collection<ConfigRow>(COLLECTIONS.meta).findOne({ _id: "config" })
    const n = doc?.patientsTotalDirectory
    return typeof n === "number" ? n : DEFAULT_TOTAL
  }

  async findDetail(patientId: string): Promise<unknown | null> {
    const db = this.mongo.getDb()
    const doc = await db.collection<PatientFullDoc>(COLLECTIONS.patients).findOne(
      { patientId },
      { projection: { _id: 0, patientId: 1, detail: 1 } },
    )
    if (!doc) return null
    return doc.detail
  }

  async findConsultRecord(patientId: string, consultId: string): Promise<unknown | null> {
    const db = this.mongo.getDb()
    const doc = await db.collection<ConsultRecordDoc>(COLLECTIONS.consultRecords).findOne(
      { patientId, consultId },
      { projection: { _id: 0, patientId: 1, consultId: 1, record: 1 } },
    )
    if (!doc) return null
    return doc.record
  }
}
