import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from "@nestjs/common"
import { PatientsService } from "./patients.service"

@Controller("patients")
export class PatientsController {
  constructor(private readonly patients: PatientsService) {}

  @Get()
  async list(): Promise<{ totalDirectory: number; patients: unknown[] }> {
    const [patients, totalDirectory] = await Promise.all([
      this.patients.listSummaries(),
      this.patients.getTotalDirectory(),
    ])
    return { totalDirectory, patients }
  }

  @Get(":patientId/consults/:consultId")
  async consult(
    @Param("patientId") patientId: string,
    @Param("consultId") consultId: string,
  ): Promise<unknown> {
    if (!patientId?.trim() || !consultId?.trim()) {
      throw new BadRequestException({ error: "Invalid id" })
    }
    const record = await this.patients.findConsultRecord(patientId, consultId)
    if (!record) {
      throw new NotFoundException({ error: "Consult not found" })
    }
    return record
  }

  @Get(":patientId")
  async detail(@Param("patientId") patientId: string): Promise<unknown> {
    if (!patientId?.trim()) {
      throw new BadRequestException({ error: "Invalid patient id" })
    }
    const detail = await this.patients.findDetail(patientId)
    if (!detail) {
      throw new NotFoundException({ error: "Patient not found" })
    }
    return detail
  }
}
