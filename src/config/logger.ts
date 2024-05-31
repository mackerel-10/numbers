import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ROOT_PATH, NODE_ENV } from './config';

const { combine, timestamp, printf } = winston.format;

const logDirectory = `${ROOT_PATH}/logs`;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new DailyRotateFile({
      level: 'info',
      dirname: logDirectory,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'error',
      dirname: `${logDirectory}/error`,
      filename: '%DATE%-error.log',
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

//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
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
