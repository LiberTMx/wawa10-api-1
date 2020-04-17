import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import * as minimist from 'minimist';

import * as log4js from 'log4js';
const logger = log4js.getLogger('AuthApiController');

@Injectable()
export class ConfigurationService {

  private /*readonly*/ envConfig: { [key: string]: string };

  constructor(/*filePath: string*/) {
    const args = minimist(process.argv.slice(2));
    const env = args.env;

    const cwd = process.cwd();
    logger.debug('cwd:' + cwd);
    logger.debug('node env is:' + process.env.NODE_ENV);
    logger.debug('app env is:' + env);

    let filename = 'wawa-10.conf';
    if (env === 'ld') filename = 'wawa-10.ld.conf';

    const filepath = cwd + '/' + filename;
    logger.debug('config file is:' + filepath);

    if (filepath !== null) 
    {
        const fileFound = fs.existsSync( filepath );
        if ( fileFound ) 
        {
          logger.debug('loading configuration from file:' + filepath);
          this.envConfig = dotenv.parse(fs.readFileSync(filepath));
        } 
        else 
        {
          logger.debug(`Configuration file ${filepath} NOT FOUND !`);
        }
    } 
    else 
    {
      logger.error('config file path is NULL !');
    }

    // tslint:disable-next-line:no-console
    console.log('Current configuration:', this.envConfig);
  }

/*   private loadEBSConfiguration() {
    / *
    db_type=postgres
    db_hostname=localhost
    db_port=5432
    db_name=bcc_ld
    db_username=postgres
    db_password=
    * /
    log('Loading EBS/RDS configuration from process env');
    this.envConfig = {};
    this.envConfig.db_type = 'postgres';
    this.envConfig.db_hostname = process.env.RDS_HOSTNAME;
    this.envConfig.db_port = process.env.RDS_PORT;
    this.envConfig.db_name = process.env.RDS_DB_NAME;
    this.envConfig.db_username = process.env.RDS_USERNAME;
    this.envConfig.db_password = process.env.RDS_PASSWORD;
  } */

  get(key: string): string {
    return this.envConfig[key];
  }
}
