import { Module } from '@nestjs/common';
import { AdminService } from './services/admin/admin.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  exports: [
    AdminService,
  ],
  providers: [AdminService],
})
export class AdminModule {}
