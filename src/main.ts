import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//import * as log4js from 'log4js';

//const cwd = process.cwd();
// log4js.configure( cwd + '/config/log4js.json');
//log4js.configure( './config/log4js.json');
//const logger = log4js.getLogger('app');

//logger.info('Starting liwa api server...');

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  //logger.info('Liwa api server started: port=' + port);
  await app.listen(port);
}
bootstrap();
