import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
