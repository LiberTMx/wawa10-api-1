import { NewsEntity } from './entities/news.entity';
import { Connection } from 'typeorm';
import { NewsImageEntity } from './entities/news-image.entity';
import { NewsDocEntity } from './entities/news-doc.entity';

export const newsProvider = [
    {
      provide: 'newsRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(NewsEntity),
      inject: ['DbConnectionToken'],
    },
];

export const newsImageProvider = [
  {
    provide: 'newsImageRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(NewsImageEntity),
    inject: ['DbConnectionToken'],
  },
];

export const newsDocProvider = [
  {
    provide: 'newsDocRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(NewsDocEntity),
    inject: ['DbConnectionToken'],
  },
];