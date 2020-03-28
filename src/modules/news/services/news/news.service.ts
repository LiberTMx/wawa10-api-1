import { Injectable } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/dto/response-message.dto';
import { NewsRepositoryService } from '../../../repository/news/services/news/news-repository.service';
import { CreateNewsDTO } from '../../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../repository/news/entities/news.entity';

@Injectable()
export class NewsService 
{
    constructor(
        private readonly newsRepositoryService: NewsRepositoryService,
    ) {}

    async create(createNewsDTO: CreateNewsDTO): Promise<NewsEntity>
    {
        const news: NewsEntity =  new NewsEntity();
        Object.assign(news, createNewsDTO);

        return await this.newsRepositoryService.saveNews(news);
    }
}
