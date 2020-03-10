import { Connection, Repository } from 'typeorm';
import { CredentialEntity } from './entities/credential.entity';

export const credentialProvider = [
  {
    provide: 'CredentialRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CredentialEntity),
    inject: ['DbConnectionToken'],
  },
];