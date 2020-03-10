import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user/services/user-repository/user-repository.service';
import { userProvider } from './user/user.providers';
import { ConfigurationModule } from '../configuration/configuration.module';
import { DatabaseModule } from '../database/database.module';
import { credentialProvider } from './credential/credential.providers';
import { CredentialRepositoryService } from './credential/services/credential-repository.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  exports: [
    CredentialRepositoryService,
    UserRepositoryService,

  ],
  providers: [
    CredentialRepositoryService, ...credentialProvider,
    UserRepositoryService, ...userProvider,
  ],
})
export class RepositoryModule {}
