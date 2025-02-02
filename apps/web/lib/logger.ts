import pino from 'pino';


export type LogLevel = 'info' | 'debug' | 'fatal' | 'error' | 'warn' | 'trace';


const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: { colorize: true },
  } : undefined,
  browser: {
    asObject: true
  }
});


export default logger;
