import { Connection } from 'typeorm';
import { AfttAllDataEntity } from './entities/aftt-all-data.entity';
import { AfttTeamEntity } from './entities/aftt-team.entity';
import { AfttDivisionEntity } from './entities/aftt-division.entity';
import { AfttMatchEntity } from './entities/aftt-match.entity';
import { AfttDivisionCategoryEntity } from './entities/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from './entities/aftt-member-by-category.entity';
import { AfttWeekByCategory } from './entities/aftt-week-by-category.entity';

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

export const afttMatchProvider = [
  {
    provide: 'afttMatchRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttMatchEntity),
    inject: ['DbConnectionToken'],
  },
];

// AfttDivisionCategoryEntity
export const afttDivisionCategoryProvider = [
  {
    provide: 'afttDivisionCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttDivisionCategoryEntity),
    inject: ['DbConnectionToken'],
  },
];

// AfttMemberByCategoryEntity
export const afttMemberByCategoryProvider = [
  {
    provide: 'afttMemberByCategoryEntityRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttMemberByCategoryEntity),
    inject: ['DbConnectionToken'],
  },
];

// AfttWeekByCategory
export const afttWeekByCategoryProvider = [
  {
    provide: 'afttWeekByCategoryEntityRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AfttWeekByCategory),
    inject: ['DbConnectionToken'],
  },
];
