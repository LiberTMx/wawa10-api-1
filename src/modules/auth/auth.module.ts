import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { JwtService } from './services/jwt/jwt.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  providers: [
    JwtService,
    AuthService, 
  ],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
