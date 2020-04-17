import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user/services/user-repository/user-repository.service';
import { userProvider, userRoleProvider, authDomainProvider, authGroupProvider } from './user/user.providers';
import { DatabaseModule } from '../database/database.module';
import { credentialProvider } from './credential/credential.providers';
import { CredentialRepositoryService } from './credential/services/credential-repository.service';
import { AuthDomainRepositoryService } from './user/services/auth-domain-repository/auth-domain-repository.service';
import { AuthGroupRepositoryService } from './user/services/auth-group-repository/auth-group-repository.service';
import { NewsRepositoryService } from './news/services/news/news-repository.service';
import { newsProvider, newsImageProvider, newsDocProvider } from './news/news.providers';
import { ConfigurationModule } from '../configuration/configuration.module';
import { NewsImageRepositoryService } from './news/services/news/news-image-repository.service';
import { NewsDocRepositoryService } from './news/services/news/news-doc-repository.service';
import { afttAllDataProvider, afttTeamProvider, afttDivisionProvider, afttMatchProvider, afttDivisionCategoryProvider, afttMemberByCategoryProvider, afttWeekByCategoryProvider } from './aftt/aftt.providers';
import { AfttRepositoryService } from './aftt/services/aftt-repository.service';
import { ParametreRepositoryService } from './parametre/services/parametre-repository.service';
import { parametreProvider } from './parametre/parametre.providers';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
  ],
  exports: [
    CredentialRepositoryService,
    UserRepositoryService,
    AuthDomainRepositoryService,
    AuthGroupRepositoryService,
    NewsRepositoryService,
    NewsImageRepositoryService,
    NewsDocRepositoryService,
    AfttRepositoryService,
    ParametreRepositoryService,
  ],
  providers: [
    CredentialRepositoryService, ...credentialProvider,
    UserRepositoryService, ...userProvider, ...userRoleProvider, 
    AuthDomainRepositoryService, ...authDomainProvider, 
    AuthGroupRepositoryService, ...authGroupProvider, 
    NewsRepositoryService,...newsProvider,
    NewsImageRepositoryService, ...newsImageProvider,
    NewsDocRepositoryService, ...newsDocProvider,
    AfttRepositoryService, ...afttAllDataProvider, ...afttTeamProvider, ...afttDivisionProvider, ...afttMatchProvider,
      ...afttDivisionCategoryProvider, ...afttMemberByCategoryProvider, ...afttWeekByCategoryProvider,

    ParametreRepositoryService, ...parametreProvider,
  ],
})
export class RepositoryModule {}
