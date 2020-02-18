import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user/services/user-repository/user-repository.service';
import { userProvider } from './user/user.providers';
import { ConfigurationModule } from '../configuration/configuration.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  exports: [
    UserRepositoryService,
  ],
  providers: [
    UserRepositoryService,
    ...userProvider,
  ],
})
export class RepositoryModule {}
