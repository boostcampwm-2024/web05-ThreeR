// src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../response/common.response';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        message = Array.isArray((res as any).message)
          ? (res as any).message[0]
          : (res as any).message;
      } else {
        message = '알수 없는 서버 예외 발생';
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '알수 없는 서버 예외 발생';
    }

    const apiResponse = ApiResponse.responseWithNoContent(statusCode, message);

    response.status(HttpStatus.OK).json(apiResponse);
  }
}
