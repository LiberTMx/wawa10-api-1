import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { InterclubsService } from './services/interclubs.service';

@Module({
    imports: [
        RepositoryModule,
      ],
      exports: [
        InterclubsService,
      ],
      providers: [InterclubsService],
})
export class InterclubsModule {}
