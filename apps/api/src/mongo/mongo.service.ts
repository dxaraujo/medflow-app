import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Db, MongoClient } from "mongodb"

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private client?: MongoClient
  private readonly dbName: string

  constructor(private readonly config: ConfigService) {
    this.dbName = this.config.get<string>("MONGODB_DB_NAME", "medflow")
  }

  async onModuleInit(): Promise<void> {
    const uri = this.config.get<string>("MONGODB_URI", "mongodb://127.0.0.1:27017")
    this.client = new MongoClient(uri, { serverSelectionTimeoutMS: 8_000 })
    await this.client.connect()
  }

  getDb(): Db {
    if (!this.client) {
      throw new Error("MongoClient not initialized")
    }
    return this.client.db(this.dbName)
  }

  async onModuleDestroy(): Promise<void> {
    await this.client?.close()
  }
}
