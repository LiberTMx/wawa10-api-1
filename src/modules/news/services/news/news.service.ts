import { Injectable, BadRequestException } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/dto/response-message.dto';
import { NewsRepositoryService } from '../../../repository/news/services/news/news-repository.service';
import { CreateNewsDTO } from '../../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../repository/news/entities/news.entity';
import { NewsImageRepositoryService } from '../../../repository/news/services/news/news-image-repository.service';
import { NewsImageEntity } from '../../../repository/news/entities/news-image.entity';
import { NewsDocRepositoryService } from '../../../repository/news/services/news/news-doc-repository.service';
import { NewsDocEntity } from '../../../repository/news/entities/news-doc.entity';
import { UpdateNewsStatusDTO } from '../../../../shared/dto/news/update-news-status.dto';

@Injectable()
export class NewsService 
{
    constructor(
        private readonly newsRepositoryService: NewsRepositoryService,
        private readonly newsImageRepositoryService: NewsImageRepositoryService,
        private readonly newsDocRepositoryService: NewsDocRepositoryService,
    ) {}

    async findById(newsId: number): Promise<NewsEntity> 
    {
        return this.newsRepositoryService.findById(newsId);
    }

    async findImageAttachedToNews(newsId: number): Promise<NewsImageEntity> 
    {
        return this.newsImageRepositoryService.findImageAttachedToNews(newsId);
    }

    async findDocumentAttachedToNews(newsId: number): Promise<NewsDocEntity> 
    {
        return this.newsDocRepositoryService.findDocumentAttachedToNews(newsId);
    }

    async create(createNewsDTO: CreateNewsDTO): Promise<NewsEntity>
    {
        const news: NewsEntity =  new NewsEntity();
        Object.assign(news, createNewsDTO);
        news.createdAt=new Date();
        news.updatedAt=new Date();
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

    async getNewsList(readAll: boolean): Promise<NewsEntity[]>
    {
        return await this.newsRepositoryService.getNewsList(readAll);
    }

    async updateStatus(updateNewsStatusDTO: UpdateNewsStatusDTO): Promise<NewsEntity>
    {
        const news: NewsEntity= await this.newsRepositoryService.findById(updateNewsStatusDTO.newsId);
        if(news!==null && news!==undefined)
        {
            news.status=updateNewsStatusDTO.newStatus;
            news.updatedAt=new Date();
            return this.newsRepositoryService.saveNews(news);
        }
        return news;
    }

    async delete(newsId: number): Promise<any>
    {
        const news: NewsEntity= await this.newsRepositoryService.findById(newsId);
        if(news===null || news===undefined)
        {
            throw new BadRequestException('news document not found!');
        }
        return await this.newsRepositoryService.delete(newsId);
    }
}
