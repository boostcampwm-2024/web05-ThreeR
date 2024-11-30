import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { WinstonLoggerService } from '../src/common/logger/logger.service';
import { InternalExceptionsFilter } from '../src/common/filters/internal-exceptions.filter';
import { HttpExceptionsFilter } from '../src/common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  const logger = app.get(WinstonLoggerService);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalFilters(
    new InternalExceptionsFilter(logger),
    new HttpExceptionsFilter(),
  );
  await app.init();
  global.testApp = app;
});

afterAll(async () => {
  await app.close();
});
