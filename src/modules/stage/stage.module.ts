import { Module } from '@nestjs/common';
import { StageService } from './services/stage/stage.service';

@Module({
  providers: [StageService]
})
export class StageModule {}
