
import { createConnection } from 'typeorm';
import { ConfigurationService } from '../configuration/configuration.service';

const configService = new ConfigurationService();

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => createConnection({
      type: 'mysql' /*configService.get('db_type')*/,      // this is an enumeration ! not possible to use this config value !
      host: /*'localhost'*/ configService.get('db_hostname'),
      port: /*5432*/ +configService.get('db_port'),
      username: /*'chat'*/ configService.get('db_username'),
      password: /*'chat'*/ configService.get('db_password'),
      database: /*'chat'*/ configService.get('db_name'),
      logging: false, // In local if this value is set to true, the queries will be printed in orm.logs file
      logger: 'file', // in the folder where package.json file is located.
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: false,
    }),
  },
  {
    name: 'wawa9',
    provide: 'wawa9_DbConnectionToken',
    useFactory: async () => createConnection({
      type: 'mysql' /*configService.get('db_type')*/,      // this is an enumeration ! not possible to use this config value !
      host: /*'localhost'*/ configService.get('wawa9_db_hostname'),
      port: /*5432*/ +configService.get('wawa9_db_port'),
      username: /*'chat'*/ configService.get('wawa9_db_username'),
      password: /*'chat'*/ configService.get('wawa9_db_password'),
      database: /*'chat'*/ configService.get('wawa9_db_name'),
      logging: false, // In local if this value is set to true, the queries will be printed in orm.logs file
      logger: 'file', // in the folder where package.json file is located.
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: false,
    }),
  },
];
