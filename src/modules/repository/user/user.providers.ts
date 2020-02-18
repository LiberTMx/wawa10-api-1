import { Connection, Repository } from 'typeorm';
import { AuthUserEntity } from './entities/auth-user.entity';

export const userProvider = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(AuthUserEntity),
    inject: ['DbConnectionToken'],
  },
];
