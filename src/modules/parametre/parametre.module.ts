import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ParametreService } from './services/parametre.service';

@Module({
    imports: [
        RepositoryModule,
      ],
      exports: [
        ParametreService,
      ],
      providers: [ParametreService],
})
export class ParametreModule {}
