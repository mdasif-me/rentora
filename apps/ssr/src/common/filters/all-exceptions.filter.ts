import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse } from '../interfaces/response.interface.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: string | string[] = 'Internal server error';
    let errorDetails = null;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        errorMessage = response;
      } else if (typeof response === 'object' && response !== null) {
        errorMessage = (response as any).message || errorMessage;
        errorDetails = (response as any).error || response;
      }
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    this.logger.error(`Exception: ${errorMessage}`, exception instanceof Error ? exception.stack : undefined);

    const responseBody: ApiResponse<null> = {
      success: false,
      message: errorMessage,
      error: errorDetails || errorMessage,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
