import pino from 'pino';
import config from '../config';

const logger = pino({
  transport: config.isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          // translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  level: config.isDev ? 'debug' : 'info',
});

export default logger;
