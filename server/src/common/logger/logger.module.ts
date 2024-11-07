import { WinstonModule } from 'nest-winston';
import { logDir, logFormat } from './logger.config';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

import * as process from 'node:process';

const { combine, timestamp } = winston.format;

// production 환경과 development 환경을 구분하기 위한 flag
const productionFlag = process.env.NODE_ENV === 'production';

export const winstonModule = WinstonModule.forRoot({
  // 로그 출력 형식에 대한 정의
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),

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
              timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              logFormat,
            ),
          }),
        ]),
  ],
});
