// src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../response/common.response';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode = exception.getStatus();
    const res = exception.getResponse();
    const message = typeof res === 'string' ? res : res['message'];

    const apiResponse = ApiResponse.responseWithNoContent(message);
    response.status(statusCode).json(apiResponse);
  }
}
