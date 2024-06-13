/**
 * winston log level
 * error: 0
 * warn: 1
 * info: 2
 * http: 3
 * verbose: 4
 * debug: 5
 * silly: 6
 */

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { NODE_ENV, LOG_LEVEL, LOG_DIRECTORY } from './config';

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  if (stack) {
    return `${timestamp} ${level}: ${stack.replace(/Error: /g, '')}`;
  } else {
    return `${timestamp} ${level}: ${message}`;
  }
});

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors(),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      level: 'error',
      dirname: `${LOG_DIRECTORY}/error`,
      filename: '%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'info',
      dirname: LOG_DIRECTORY,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'debug',
      dirname: `${LOG_DIRECTORY}/debug`,
      filename: '%DATE%-debug.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      level: 'error',
      dirname: `${LOG_DIRECTORY}/error`,
      filename: '%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

export default logger;
