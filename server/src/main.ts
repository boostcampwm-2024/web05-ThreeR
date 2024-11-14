import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://denamu.netlify.app/'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
