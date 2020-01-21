import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthApiController } from './controllers/api/auth-api/auth-api.controller';
import { AuthService } from './modules/auth/services/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthApiController],
  providers: [AppService, AuthService],
})
export class AppModule {}
