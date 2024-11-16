import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';
import { LoggingInterceptor } from './common/logger/logger.interceptor';
import { WinstonLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLoggerService);
  app.use(cookieParser());
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors({
    origin: ['http://localhost:5173', 'https://denamu.netlify.app/'],
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
