import { Injectable } from "@nestjs/common"
import type { Document } from "mongodb"
import { COLLECTIONS } from "../collections"
import { MongoService } from "../mongo/mongo.service"

export type DashboardAttendanceDoc = {
  monthly: unknown[]
  weekly: unknown[]
  tilesSemanal: unknown[]
  tilesHistorico: unknown[]
}

type DashboardRow = Document &
  DashboardAttendanceDoc & {
    _id: string
  }

@Injectable()
export class DashboardService {
  constructor(private readonly mongo: MongoService) {}

  async getAttendance(): Promise<DashboardAttendanceDoc | null> {
    const db = this.mongo.getDb()
    const doc = await db.collection<DashboardRow>(COLLECTIONS.dashboardAttendance).findOne({
      _id: "default",
    })
    if (!doc) return null
    const { _id: _idIgnored, ...rest } = doc
    return rest
  }
}
