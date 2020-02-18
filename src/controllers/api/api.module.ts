import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api/auth-api.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { RepositoryModule } from '../../modules/repository/repository.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    AuthApiController,
  ],
  providers: [
  ],
})
export class ApiModule {}
