import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../response/common.response.js';

@Injectable()
export class CustomResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => {
                const statusCode = response.statusCode
                if (statusCode === 204) {
                    return ApiResponse.successWithNoContent(statusCode);
                }

                return ApiResponse.success(statusCode, data);
            })
        );
    }
}