import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api/auth-api.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { AdminApiController } from './admin-api/admin-api.controller';
import { SoapModule } from '../../modules/soap/soap.module';
import { ContactApiController } from './contact-api/contact-api.controller';
import { ContactModule } from '../../modules/contact/contact.module';
import { NewsApiController } from './news-api/news-api.controller';
import { NewsModule } from '../../modules/news/news.module';
import { ConfigurationModule } from '../../modules/configuration/configuration.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from '../../modules/admin/admin.module';
import { ParametreApiController } from './parametre-api/parametre-api.controller';
import { ParametreModule } from '../../modules/parametre/parametre.module';
import { StatusApiController } from './status-api/status-api.controller';
import { RoiApiController } from './roi-api/roi-api.controller';
import { InterclubsApiController } from './interclubs-api/interclubs-api.controller';
import { InterclubsModule } from '../../modules/interclubs/interclubs.module';

@Module({
  imports: [
    ConfigurationModule,
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    AdminModule,
    SoapModule,
    ContactModule,
    NewsModule,
    ParametreModule,
    InterclubsModule,
  ],
  controllers: [
    AuthApiController,
    AdminApiController,
    ContactApiController,
    NewsApiController,
    ParametreApiController,
    StatusApiController,
    RoiApiController,
    InterclubsApiController,
  ],
  providers: [
  ],
})
export class ApiModule {}
