import { WinstonModule } from 'nest-winston';
import { logDir, logFormat, productionFlag } from './logger.config';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

const winstonModule = WinstonModule.forRoot({
  // 로그 출력 형식에 대한 정의
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),

  transports: [
    ...(productionFlag
      ? [
          //info 레벨 로그 파일 설정
          new DailyRotateFile({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
          }),
          //error 레벨 로그 파일 설정
          new DailyRotateFile({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: `${logDir}/error`,
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
          }),
        ]
      : [
          // 콘솔에 로그 출력
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              logFormat,
            ),
          }),
        ]),
  ],
});

@Global()
@Module({
  imports: [winstonModule],
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class WinstonLoggerModule {}
