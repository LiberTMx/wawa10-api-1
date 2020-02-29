import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api/auth-api.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { RepositoryModule } from '../../modules/repository/repository.module';
import { AdminApiController } from './admin-api/admin-api.controller';
import { SoapModule } from '../../modules/soap/soap.module';

@Module({
  imports: [
    AuthModule,
    SoapModule,
  ],
  controllers: [
    AuthApiController,
    AdminApiController,
  ],
  providers: [
  ],
})
export class ApiModule {}
