import { PeriodeEntity } from './entities/periode.entity';
import { Connection } from 'typeorm';

export const periodeProvider = [
    {
      provide: 'periodeRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(PeriodeEntity),
      inject: ['DbConnectionToken'],
    },
];
