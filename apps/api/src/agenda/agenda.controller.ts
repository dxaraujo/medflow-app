import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
} from "@nestjs/common"
import { AgendaService } from "./agenda.service"

const WEEK_START_RE = /^\d{4}-\d{2}-\d{2}$/

@Controller("agenda")
export class AgendaController {
  constructor(private readonly agenda: AgendaService) {}

  @Get("week")
  async week(@Query("weekStart") weekStart: string | undefined): Promise<unknown> {
    const ws = weekStart ?? ""
    if (!WEEK_START_RE.test(ws)) {
      throw new BadRequestException({ error: "weekStart query required (YYYY-MM-DD)" })
    }
    const data = await this.agenda.findWeek(ws)
    if (!data) {
      throw new NotFoundException({ error: "Week not found" })
    }
    return data
  }
}
