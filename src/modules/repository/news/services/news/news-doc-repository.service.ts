import { Injectable, Inject } from '@nestjs/common';
import { NewsEntity } from '../../entities/news.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { NewsDocEntity } from '../../entities/news-doc.entity';

@Injectable()
export class NewsDocRepositoryService 
{
    
    constructor(
        @Inject('newsDocRepositoryToken')
        private readonly newsDocRepository: BaseRepository<NewsDocEntity>,
    ) {}

    async saveNewsDoc(newsDoc: NewsDocEntity): Promise<NewsDocEntity> 
    {
        return this.newsDocRepository.save(newsDoc);
    }

    async findDocumentAttachedToNews(newsId: number): Promise<NewsDocEntity> 
    {
        return this.newsDocRepository.findOne({where: { /*newsId:*/ newsId}});
    }

    async createNewsDoc(news: NewsEntity, docFilename: string, mimeType: string): Promise<NewsDocEntity>
    {
        const doc = new NewsDocEntity();
        doc.docFilename=docFilename;
        doc.news=news;
        doc.newsId=news.id;
        doc.mimeType=mimeType;
        return this.saveNewsDoc(doc);
    }
}
