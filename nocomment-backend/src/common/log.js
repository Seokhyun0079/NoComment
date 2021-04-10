import winston from 'winston';
import moment from 'moment'; //한국시간을 나타내기 위한 모듈 추가
import fs from 'fs';
const logDir = '.';

/*로그 만드는 함수(방법) */
const log = (ctx, next) => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  var logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'info',
        timestamp: function () {
          //한국 시간 나타내는법
          return moment().format('YYYY-MM-DD HH:mm:ss');
        },
      }),
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        filename: `${logDir}/log.log`,
        prepend: true,
        timestamp: function () {
          //한국 시간 나타내는법
          return moment().format('YYYY-MM-DD HH:mm:ss');
        },
      }),
    ],
  });
  try {
    logger.info('log start : ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    logger.info(ctx.request.ip);
    logger.info(ctx.request.url);
    logger.info(ctx.request.body);
    logger.info(ctx.params);
    logger.info(ctx.query);
    logger.info(ctx.state);
    logger.info('log end');
  } catch (exception) {
    logger.error('ERROR=>' + exception);
  }
  return next();
};

export default log;
