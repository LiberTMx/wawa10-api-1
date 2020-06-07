import { Module } from '@nestjs/common';
import { StageService } from './services/stage/stage.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  exports: [
    StageService,
  ],
  providers: [
    StageService,
  ],
})
export class StageModule {}
