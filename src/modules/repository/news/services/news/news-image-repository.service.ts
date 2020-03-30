import { Injectable, Inject } from '@nestjs/common';
import { NewsEntity } from '../../entities/news.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { NewsImageEntity } from '../../entities/news-image.entity';
import { NewsDocEntity } from '../../entities/news-doc.entity';

@Injectable()
export class NewsImageRepositoryService 
{
    
    constructor(
        @Inject('newsImageRepositoryToken')
        private readonly newsImageRepository: BaseRepository<NewsImageEntity>,
    ) {}

    async saveNewsImage(newsImage: NewsImageEntity): Promise<NewsImageEntity> 
    {
        return this.newsImageRepository.save(newsImage);
    }

    async createNewsImage(news: NewsEntity, imageFilename: string, mimeType: string): Promise<NewsImageEntity>
    {
        const image = new NewsImageEntity();
        image.imageFilename=imageFilename;
        image.news=news;
        image.newsId=news.id;
        image.mimeType=mimeType;
        return this.saveNewsImage(image);
    }

    async findImageAttachedToNews(newsId: number): Promise<NewsImageEntity> 
    {
        return this.newsImageRepository.findOne({where: { /*newsId:*/ newsId}});
    }
}
