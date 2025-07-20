import winston from 'winston';
import morgan from 'morgan';
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});

const loggerMorgan = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json(),
  ),
  transports: [new winston.transports.Console()],
});
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => loggerMorgan.http(message.trim()),
    },
  },
);

export { logger, morganMiddleware };