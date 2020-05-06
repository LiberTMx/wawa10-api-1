import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user/services/user-repository/user-repository.service';
import { userProvider, userRoleProvider, authDomainProvider, authGroupProvider, authFonctionProvider, authGroupRoleProvider, authUserFonctionProvider, authUserGroupProvider } from './user/user.providers';
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
import { afttAllDataProvider, afttTeamProvider, afttDivisionProvider, afttMatchProvider, 
  afttDivisionCategoryProvider, afttMemberByCategoryProvider, afttWeekByCategoryProvider, afttMatchTypeProvider } from './aftt/aftt.providers';
import { AfttRepositoryService } from './aftt/services/aftt-repository.service';
import { ParametreRepositoryService } from './parametre/services/parametre-repository.service';
import { parametreProvider } from './parametre/parametre.providers';
import { AuthRoleRepositoryService } from './user/services/auth-role-repository/auth-role-repository/auth-role-repository.service';
import { AuthGroupRoleRepositoryService } from './user/services/auth-group-role-repository/auth-group-role-repository.service';
import { InterclubsRepositoryService } from './interclubs/services/interclubs-repository.service';
import { interclubsSemaineProvider, interclubsCategoryProvider, interclubsDivisionProvider, interclubsTeamProvider, interclubsMatchProvider, interclubsLdfParticipantProvider, interclubsLdfByCategoryProvider, interclubsSemaineVersionProvider } from './interclubs/interclubs.providers';

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
    AuthRoleRepositoryService,
    AuthGroupRoleRepositoryService,
    NewsRepositoryService,
    NewsImageRepositoryService,
    NewsDocRepositoryService,
    AfttRepositoryService,
    ParametreRepositoryService,
    InterclubsRepositoryService,
  ],
  providers: [
    CredentialRepositoryService, ...credentialProvider,
    UserRepositoryService, ...userProvider, ...authFonctionProvider, ...authUserFonctionProvider, ...authUserGroupProvider,
    AuthRoleRepositoryService, ...userRoleProvider,
    AuthDomainRepositoryService, ...authDomainProvider, 
    AuthGroupRepositoryService, ...authGroupProvider, 
    AuthGroupRoleRepositoryService, ...authGroupRoleProvider,

    NewsRepositoryService,...newsProvider,
    NewsImageRepositoryService, ...newsImageProvider,
    NewsDocRepositoryService, ...newsDocProvider,
    AfttRepositoryService, ...afttAllDataProvider, ...afttTeamProvider, ...afttDivisionProvider, ...afttMatchProvider,
      ...afttDivisionCategoryProvider, ...afttMemberByCategoryProvider, ...afttWeekByCategoryProvider, ...afttMatchTypeProvider,

    ParametreRepositoryService, ...parametreProvider, 

    InterclubsRepositoryService, ...interclubsSemaineProvider, ...interclubsCategoryProvider, 
      ...interclubsDivisionProvider, ...interclubsTeamProvider, ...interclubsMatchProvider,
      ...interclubsLdfParticipantProvider, ...interclubsLdfByCategoryProvider, ...interclubsSemaineVersionProvider,
  ],
})
export class RepositoryModule {}
