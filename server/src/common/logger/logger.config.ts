import * as winston from 'winston';
import * as process from 'node:process';

// 로그 저장 경로
export const logDir = `${__dirname}/../../../../logs`;

// 로그 출력 포맷 정의 함수
export const logFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  },
);

// production 환경과 development 환경을 구분하기 위한 flag
export const productionFlag = process.env.NODE_ENV === 'production';
