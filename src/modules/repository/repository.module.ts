import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user/services/user-repository/user-repository.service';
import { userProvider, userRoleProvider, authDomainProvider, authGroupProvider } from './user/user.providers';
import { ConfigurationModule } from '../configuration/configuration.module';
import { DatabaseModule } from '../database/database.module';
import { credentialProvider } from './credential/credential.providers';
import { CredentialRepositoryService } from './credential/services/credential-repository.service';
import { AuthDomainRepositoryService } from './user/services/auth-domain-repository/auth-domain-repository.service';
import { AuthGroupRepositoryService } from './user/services/auth-group-repository/auth-group-repository.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  exports: [
    CredentialRepositoryService,
    UserRepositoryService,
    AuthDomainRepositoryService,
    AuthGroupRepositoryService,
  ],
  providers: [
    CredentialRepositoryService, ...credentialProvider,
    UserRepositoryService, ...userProvider, ...userRoleProvider, 
    AuthDomainRepositoryService, ...authDomainProvider, 
    AuthGroupRepositoryService, ...authGroupProvider,
  ],
})
export class RepositoryModule {}
