import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { InterclubsService } from './services/interclubs.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        RepositoryModule,
      ],
      exports: [
        InterclubsService,
      ],
      providers: [InterclubsService],
})
export class InterclubsModule {}
