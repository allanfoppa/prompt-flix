import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

export interface ApiResponse<T> {
  metadata: {
    status: 'success';
    statusCode: number;
    path: string;
    timestamp: string;
    correlationId: string;
  };
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        metadata: {
          status: 'success' as const,
          statusCode: res.statusCode,
          path: req.url,
          timestamp: new Date().toISOString(),
          correlationId: req.correlationId ?? '',
        },
        data,
      })),
    );
  }
}
