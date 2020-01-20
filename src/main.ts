import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { LoggerService } from '@modules/shared/services';
//const winston = require('winston');
//import * as winston from 'winston';
//import { LoggerService } from '@nestjs/common';

import * as log4js from 'log4js';

const cwd = process.cwd();
console.log('cwd', cwd);
log4js.configure( cwd + '/config/log4js.json');
//log4js.configure( './config/log4js.json');
const logger = log4js.getLogger('app');

//logger.info('Starting liwa api server...');

/*
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/debug.log', level: 'debug' }),
    new winston.transports.File({ filename: './log/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
*/

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {logger});
  app.setGlobalPrefix('api');
  app.enableCors();
  logger.info('Liwa api server started: port=' + port);
  await app.listen(port);
}
bootstrap();
