import { Injectable } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/dto/response-message.dto';
import { NewsRepositoryService } from '../../../repository/news/services/news/news-repository.service';
import { CreateNewsDTO } from '../../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../repository/news/entities/news.entity';
import { NewsImageRepositoryService } from '../../../repository/news/services/news/news-image-repository.service';
import { NewsImageEntity } from '../../../repository/news/entities/news-image.entity';
import { NewsDocRepositoryService } from '../../../repository/news/services/news/news-doc-repository.service';
import { NewsDocEntity } from '../../../repository/news/entities/news-doc.entity';

@Injectable()
export class NewsService 
{
    constructor(
        private readonly newsRepositoryService: NewsRepositoryService,
        private readonly newsImageRepositoryService: NewsImageRepositoryService,
        private readonly newsDocRepositoryService: NewsDocRepositoryService,
    ) {}

    async create(createNewsDTO: CreateNewsDTO): Promise<NewsEntity>
    {
        const news: NewsEntity =  new NewsEntity();
        Object.assign(news, createNewsDTO);

        return await this.newsRepositoryService.saveNews(news);
    }

    async attachImageToNews(news: NewsEntity, imageFilename: string, mimeType: string): Promise<NewsImageEntity>
    {
        return this.newsImageRepositoryService.createNewsImage(news, imageFilename, mimeType);
    } 

    async attachDocToNews(news: NewsEntity, docFilename: string, mimeType: string): Promise<NewsDocEntity>
    {
        return this.newsDocRepositoryService.createNewsDoc(news, docFilename, mimeType);
    } 
}
