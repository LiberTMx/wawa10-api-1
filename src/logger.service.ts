// logger.service.ts
/*
import * as winston from 'winston';
import * as chalk from 'chalk';
import * as PrettyError from 'pretty-error'; // it's really handy to make your life easier
import { Env } from '@modules/shared/utils'; // using typescript paths, you know !
import { LoggerInstance, LoggerOptions, Transport } from 'winston';
import { combineLatest } from 'rxjs';

export class LoggerService {
  private readonly logger: LoggerInstance;
  private readonly prettyError = new PrettyError();
  public static loggerOptions: LoggerOptions = {
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        prettyPrint()
      ),
    transports: [
      new winston.transports.File({
        filename: Env('LOG_FILE', 'app.dev.log'), // i will explain this later
        //json: true,
        //prettyPrint: true,
        //timestamp: true,
        
      }),
    ],
  };
  public static options: LoggerOptions = {
    file: {
      level: 'info',
      filename: Env('LOG_FILE', 'app.dev.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  constructor(private context: string, transport?) {
    this.logger = (winston as any).createLogger(LoggerService.loggerOptions);
    this.prettyError.skipNodeFiles();
    this.prettyError.skipPackage('express', '@nestjs/common', '@nestjs/core');
  }
  get Logger(): LoggerInstance {
    return this.logger; // idk why i have this in my code !
  }
  static configGlobal(options?: LoggerOptions) {
    this.loggerOptions = options; 
  }
  log(message: string): void {
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('info', message);
  }
  error(message: string, trace?: any): void {
    const currentDate = new Date();
    // i think the trace should be JSON Stringified 
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('error', message, trace);
  }
  warn(message: string): void {
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('warn', message);
  }
  overrideOptions(options: LoggerOptions) {
    this.logger.configure(options);
  }
  // this method just for printing a cool log in your terminal , using chalk
  private formatedLog(level: string, message: string, error?): void {
    let result = '';
    const color = chalk.default;
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      case 'info':
        result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        if (error && Env('NODE_ENV') === 'dev') this.prettyError.render(error, true);
        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      default:
        break;
    }
    //console.log(result);
  }
}
*/
