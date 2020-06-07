import { Connection } from 'typeorm';
import { StageEntity } from './entities/stage.entity';

export const stageProvider = [
  {
    provide: 'stageRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(StageEntity),
    inject: ['DbConnectionToken'],
  },
];
