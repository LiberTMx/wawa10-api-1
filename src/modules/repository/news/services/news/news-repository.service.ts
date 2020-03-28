import { Injectable, Inject } from '@nestjs/common';
import { NewsEntity } from '../../entities/news.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class NewsRepositoryService 
{
    
    constructor(
        @Inject('newsRepositoryToken')
        private readonly newsRepository: BaseRepository<NewsEntity>,
    ) {}

    async saveNews(news: NewsEntity): Promise<NewsEntity> 
    {
        return this.newsRepository.save(news);
    }
}
