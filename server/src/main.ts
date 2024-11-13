import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
