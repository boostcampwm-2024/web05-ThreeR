import * as winston from 'winston';
import * as process from 'node:process';

const { printf } = winston.format;

// 로그 저장 경로
export const logDir = `${process.cwd()}/logs`;

// 로그 출력 포맷 정의 함수
export const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
