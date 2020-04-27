import { Connection } from 'typeorm';
import { InterclubsSemaineEntity } from './entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from './entities/interclub-category.entity';

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

export const interclubscategoryProvider = [
  {
    provide: 'interclubsCategoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(InterclubsCategoryEntity), 
    inject: ['DbConnectionToken'],
  },
];
