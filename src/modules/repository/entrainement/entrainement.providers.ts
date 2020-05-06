import { EntrainementClasseEntity } from './entities/entrainement-classe.entity';
import { Connection } from 'typeorm';

export const entrainementClasseProvider = [
    {
      provide: 'entrainementClasseRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(EntrainementClasseEntity),
      inject: ['DbConnectionToken'],
    },
];
