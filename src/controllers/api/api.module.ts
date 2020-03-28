import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api/auth-api.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { RepositoryModule } from '../../modules/repository/repository.module';
import { AdminApiController } from './admin-api/admin-api.controller';
import { SoapModule } from '../../modules/soap/soap.module';
import { ContactApiController } from './contact-api/contact-api.controller';
import { ContactModule } from '../../modules/contact/contact.module';
import { NewsApiController } from './news-api/news-api.controller';
import { NewsModule } from '../../modules/news/news.module';

@Module({
  imports: [
    AuthModule,
    SoapModule,
    ContactModule,
    NewsModule,
  ],
  controllers: [
    AuthApiController,
    AdminApiController,
    ContactApiController,
    NewsApiController,
  ],
  providers: [
  ],
})
export class ApiModule {}
