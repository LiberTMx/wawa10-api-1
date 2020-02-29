import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './controllers/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { SoapModule } from './modules/soap/soap.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ApiModule,
    SoapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
