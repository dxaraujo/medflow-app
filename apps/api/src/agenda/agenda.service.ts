import { Injectable } from "@nestjs/common"
import type { Document } from "mongodb"
import { COLLECTIONS } from "../collections"
import { MongoService } from "../mongo/mongo.service"

export type AgendaWeekDoc = {
  weekStart: string
  highlightDayIndex: number
  weekRangeLabel: string
  columns: unknown[]
}

type AgendaRow = Document & AgendaWeekDoc

@Injectable()
export class AgendaService {
  constructor(private readonly mongo: MongoService) {}

  async findWeek(weekStart: string): Promise<AgendaWeekDoc | null> {
    const db = this.mongo.getDb()
    const doc = await db.collection<AgendaRow>(COLLECTIONS.agendaWeeks).findOne({ weekStart })
    if (!doc) return null
    const { _id: _idIgnored, ...rest } = doc
    return rest
  }
}
