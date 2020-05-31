import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './controllers/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { SoapModule } from './modules/soap/soap.module';
import { MailModule } from './modules/mail/mail.module';
import { ContactModule } from './modules/contact/contact.module';
import { NewsModule } from './modules/news/news.module';
import { AdminModule } from './modules/admin/admin.module';
import { ParametreModule } from './modules/parametre/parametre.module';
import { StatusModule } from './modules/status/status.module';
import { RoiModule } from './modules/roi/roi.module';
import { InterclubsModule } from './modules/interclubs/interclubs.module';
import { EntrainementModule } from './modules/entrainement/entrainement.module';
import { PeriodeModule } from './modules/periode/periode.module';
import { StageModule } from './modules/stage/stage.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    ConfigModule.forRoot(),
    AuthModule,
    ApiModule,
    SoapModule,
    MailModule,
    ContactModule,
    NewsModule,
    AdminModule,
    ParametreModule,
    StatusModule,
    RoiModule,
    InterclubsModule,
    EntrainementModule,
    PeriodeModule,
    StageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
