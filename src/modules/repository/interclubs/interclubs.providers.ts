import { Connection } from 'typeorm';
import { InterclubsSemaineEntity } from './entities/interclubs-semaine.entity';
import { InterclubsDivisionEntity } from './entities/interclubs-division.entity';
import { InterclubsTeamEntity } from './entities/interclubs-team.entity';
import { InterclubsCategoryEntity } from './entities/interclubs-category.entity';
import { InterclubsMatchEntity } from './entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from './entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from './entities/interclubs-ldf-by-category.entity';
import { InterclubsSemaineVersionEntity } from './entities/interclubs-semaine-version.entity';

// interclubsEntity
/* export const interclubsProvider = [
    {
      provide: 'interclubsRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(interclubsEntity),
      inject: ['DbConnectionToken'],
    },
]; */

export const interclubsSemaineProvider = [
  {
    provide: 'interclubsSemaineRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsSemaineEntity), 
    inject: ['DbConnectionToken'],
  },
];

export const interclubsCategoryProvider = [
  {
    provide: 'interclubsCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsCategoryEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsDivisionEntity
export const interclubsDivisionProvider = [
  {
    provide: 'interclubsDivisionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsDivisionEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsTeamEntity
export const interclubsTeamProvider = [
  {
    provide: 'interclubsTeamRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsTeamEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsMatchEntity
export const interclubsMatchProvider = [
  {
    provide: 'interclubsMatchRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsMatchEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsLdfParticipantEntity
export const interclubsLdfParticipantProvider = [
  {
    provide: 'interclubsLdfParticipantRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsLdfParticipantEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsLdfByCategoryEntity
export const interclubsLdfByCategoryProvider = [
  {
    provide: 'interclubsLdfByCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsLdfByCategoryEntity), 
    inject: ['DbConnectionToken'],
  },
];

// InterclubsSemaineVersionEntity
export const interclubsSemaineVersionProvider = [
  {
    provide: 'interclubsSemaineVersionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsSemaineVersionEntity), 
    inject: ['DbConnectionToken'],
  },
];
