import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AgendaModule } from "./agenda/agenda.module"
import { DashboardModule } from "./dashboard/dashboard.module"
import { HealthModule } from "./health/health.module"
import { MongoModule } from "./mongo/mongo.module"
import { PatientsModule } from "./patients/patients.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    HealthModule,
    PatientsModule,
    AgendaModule,
    DashboardModule,
  ],
})
export class AppModule {}
