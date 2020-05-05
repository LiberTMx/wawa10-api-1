import { Module } from '@nestjs/common';
import { EntrainementService } from './services/entrainement/entrainement.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  exports: [
    EntrainementService,
  ],
  providers: [
    EntrainementService,
  ],
})
export class EntrainementModule {}
