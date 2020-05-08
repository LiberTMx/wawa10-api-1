import { EntrainementClasseEntity } from './entities/entrainement-classe.entity';
import { Connection } from 'typeorm';
import { EntrainementClasseGroupeEntity } from './entities/entrainement-classe-groupe.entity';
import { EntrainementGroupeSeanceEntity } from './entities/entrainement-groupe-seance.entity';

export const entrainementClasseProvider = [
    {
      provide: 'entrainementClasseRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(EntrainementClasseEntity),
      inject: ['DbConnectionToken'],
    },
];

// EntrainementClasseGroupeEntity
export const entrainementClasseGroupeProvider = [
  {
    provide: 'entrainementClasseGroupeRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(EntrainementClasseGroupeEntity),
    inject: ['DbConnectionToken'],
  },
];

// EntrainementGroupeSeanceEntity
export const entrainementGroupeSeanceProvider = [
  {
    provide: 'entrainementGroupeSeanceRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(EntrainementGroupeSeanceEntity),
    inject: ['DbConnectionToken'],
  },
];
