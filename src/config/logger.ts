import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ROOT_PATH, NODE_ENV } from './config';

const { combine, timestamp, printf } = winston.format;

const logDirectory = `${ROOT_PATH}/logs`;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

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

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new DailyRotateFile({
      level: 'error',
      dirname: `${logDirectory}/error`,
      filename: '%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'info',
      dirname: logDirectory,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'debug',
      dirname: `${logDirectory}/debug`,
      filename: '%DATE%-debug.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      level: 'error',
      dirname: `${logDirectory}/error`,
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
        winston.format.colorize(), // log level별로 색상 적용하기
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

export default logger;
