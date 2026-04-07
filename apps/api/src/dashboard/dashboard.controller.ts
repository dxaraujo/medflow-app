import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common"
import { DashboardService } from "./dashboard.service"

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get("attendance")
  async attendance(): Promise<unknown> {
    const data = await this.dashboard.getAttendance()
    if (!data) {
      throw new HttpException({ error: "Dashboard data not seeded" }, HttpStatus.SERVICE_UNAVAILABLE)
    }
    return data
  }
}
