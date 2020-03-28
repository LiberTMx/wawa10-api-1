import { Module } from '@nestjs/common';
import { NewsService } from './services/news/news.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
  ],
  providers: [NewsService],
  exports: [
    NewsService,
  ],
})
export class NewsModule {}
