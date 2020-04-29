import { Module } from '@nestjs/common';
import { AdminService } from './services/admin/admin.service';
import { RepositoryModule } from '../repository/repository.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RepositoryModule,
    AuthModule,
  ],
  exports: [
    AdminService,
  ],
  providers: [AdminService],
})
export class AdminModule {}
