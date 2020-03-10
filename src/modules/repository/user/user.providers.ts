import { Connection, Repository } from 'typeorm';
import { AuthUserEntity } from './entities/auth-user.entity';

export const userProvider = [
  {
    provide: 'AuthUserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthUserEntity),
    inject: ['DbConnectionToken'],
  },
];
