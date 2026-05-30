import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isClientError = status >= 400 && status < 500;

    const message = isClientError
      ? this.resolveClientMessage(exception)
      : this.resolveServerMessage(exception, req, status);

    res.status(status).json({
      metadata: {
        status: 'error',
        statusCode: status,
        endpoint: req.url,
        timestamp: new Date().toISOString(),
        correlationId: req.correlationId ?? '',
        message,
      },
    });
  }

  private resolveClientMessage(exception: unknown): string {
    if (!(exception instanceof HttpException)) return 'Bad request';

    const response = exception.getResponse();

    if (typeof response === 'string') return response;

    if (typeof response === 'object' && response !== null) {
      const body = response as Record<string, unknown>;

      if (Array.isArray(body['message'])) {
        return (body['message'] as string[]).join(', ');
      }

      if (typeof body['message'] === 'string') return body['message'];
    }

    return exception.message;
  }

  private resolveServerMessage(
    exception: unknown,
    req: Request,
    status: number,
  ): string {
    this.logger.error(
      `${req.method} ${req.url} → ${status}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Internal server error';
  }
}
