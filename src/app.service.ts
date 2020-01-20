import { Injectable } from '@nestjs/common';
//import { Logger } from '@nestjs/common';
import * as log4js from 'log4js';
const logger = log4js.getLogger('AppService');

@Injectable()
export class AppService {
  //private readonly logger = new Logger(AppService.name);
  getHello(): string {
    logger.debug('sending app message');
    return 'Hello World!, This is Liwa site2 api talking...';
  }
}
