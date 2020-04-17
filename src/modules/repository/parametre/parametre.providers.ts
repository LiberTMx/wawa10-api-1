import { Connection } from 'typeorm';
import { ParametreEntity } from './entities/parameter.entity';

// ParametreEntity
export const parametreProvider = [
    {
      provide: 'parametreRepositoryToken',
      useFactory: (connection: Connection) => connection.getRepository(ParametreEntity),
      inject: ['DbConnectionToken'],
    },
];
