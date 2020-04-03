import { Connection } from 'typeorm';
import { AfttAllDataEntity } from './entities/aftt-all-data.entity';
import { AfttTeamEntity } from './entities/aftt-team.entity';
import { AfttDivisionEntity } from './entities/aftt-division.entity';

export const afttAllDataProvider = [
    {
      provide: 'afttAllDataRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(AfttAllDataEntity),
      inject: ['DbConnectionToken'],
    },
];

export const afttTeamProvider = [
  {
    provide: 'afttTeamRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttTeamEntity),
    inject: ['DbConnectionToken'],
  },
];

export const afttDivisionProvider = [
  {
    provide: 'afttDivisionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttDivisionEntity),
    inject: ['DbConnectionToken'],
  },
];
