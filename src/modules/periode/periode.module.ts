import { Module } from '@nestjs/common';
import { PeriodeService } from './services/periode.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  providers: [
    PeriodeService,
  ],
  exports: [
    PeriodeService,
  ],
})
export class PeriodeModule {}
