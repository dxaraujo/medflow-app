import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common"
import type { Response } from "express"

/**
 * Normaliza erros HTTP para `{ error: string }`, compatível com o cliente em `apps/web`.
 */
@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const body = exception.getResponse()

    if (typeof body === "object" && body !== null && "error" in body) {
      const err = (body as { error: unknown }).error
      if (typeof err === "string") {
        response.status(status).json({ error: err })
        return
      }
    }

    if (typeof body === "string") {
      response.status(status).json({ error: body })
      return
    }

    if (typeof body === "object" && body !== null && "message" in body) {
      const msg = (body as { message: unknown }).message
      if (typeof msg === "string") {
        response.status(status).json({ error: msg })
        return
      }
      if (typeof msg === "object" && msg !== null && "error" in msg) {
        const e = (msg as { error: unknown }).error
        if (typeof e === "string") {
          response.status(status).json({ error: e })
          return
        }
      }
    }

    response.status(status).json({
      error: HttpStatus[status] ?? "Error",
    })
  }
}
