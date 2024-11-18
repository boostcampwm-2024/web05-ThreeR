import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize } from 'rxjs';
import { WinstonLoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (!url.includes('register') && !url.includes('login')) {
      this.logger.log(
        JSON.stringify({
          host:
            request.headers['x-forwarded-for'] ||
            request.socket.remoteAddress ||
            request.connection.remoteAddress,
          method: request.method,
          url: request.url,
          body: request.body,
        }),
      );
    }
    return next.handle().pipe(
      finalize(() => {
        if (process.env.NODE_ENV === 'development') {
          const endTime = Date.now();
          const elapsedTime = endTime - startTime;
          console.log(`Request Processing Time ${elapsedTime}ms`);
        }
      }),
    );
  }
}
