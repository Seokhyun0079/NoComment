// logger.ts
import { createLogger, transports, format } from 'winston';
import Koa from 'koa';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}
import moment from 'moment'; //한국시간을 나타내기 위한 모듈 추가
import fs from 'fs';
const logDir = '.';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.label({ label: '[log]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
        ),
      ),
    }),
  ],
}); /*로그 만드는 함수(방법) */
const log = (ctx: Koa.Context, next: Function) => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  try {
    logger.info('log start : ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    logger.info(ctx.request.ip);
    logger.info(ctx.request.url);
    if (ctx.request.body) {
      logger.info(ctx.request.body);
    }
    if (ctx.params) {
      logger.info(ctx.params);
    }
    if (ctx.query) {
      logger.info(ctx.query);
    }
    logger.info(ctx.state);
    logger.info('log end');
  } catch (exception) {
    logger.error('ERROR=>' + exception);
  }
  return next();
};

export default log;
