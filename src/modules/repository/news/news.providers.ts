import { NewsEntity } from './entities/news.entity';
import { Connection } from 'typeorm';

export const newsProvider = [
    {
      provide: 'newsRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(NewsEntity),
      inject: ['DbConnectionToken'],
    },
];
