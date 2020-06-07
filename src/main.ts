import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import * as log4js from 'log4js';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import 'reflect-metadata';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';

import * as fileSystem from 'fs';

initializeTransactionalContext(); // Initialize cls-hooked

/*
const app = express();

app.use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }) );
  */

const cwd = process.cwd();
log4js.configure( cwd + '/config/log4js.json');
//log4js.configure( './config/log4js.json');
const logger = log4js.getLogger('app');

const httpsOptions = {
  key: fileSystem.readFileSync(cwd + '/config/ssl/localhost.key'),
  cert: fileSystem.readFileSync( cwd + '/config/ssl/localhost.crt'),
};

async function bootstrap() {
  const useHttps=false;
  const defaultPort = useHttps ? 443 : 3000;
  const port = process.env.PORT || defaultPort;
  let nestApp=null;
  if(useHttps)
  {nestApp = await NestFactory.create(AppModule, {logger, httpsOptions});}
  else
  {nestApp = await NestFactory.create(AppModule, {logger});}

  nestApp.setGlobalPrefix('api');
  nestApp.enableCors();
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );


  const httpAdapter = nestApp.getHttpAdapter();
  httpAdapter.use(helmet())
    .use(compression())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }) );

  logger.info('Liwa api server started: port=' + port);
  await nestApp.listen(port);
}
bootstrap();
