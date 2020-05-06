import { Injectable, Inject, Logger } from '@nestjs/common';
import { NewsEntity } from '../../entities/news.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { NewsStatusType } from '../../../../news/types/news-status.enum';

import * as log4js from 'log4js';
const logger = log4js.getLogger('NewsRepositoryService');
@Injectable()
export class NewsRepositoryService 
{
    
    constructor(
        @Inject('newsRepositoryToken')
        private readonly newsRepository: BaseRepository<NewsEntity>,
    ) {}

    async findById(newsId: number): Promise<NewsEntity> 
    {
        // return this.newsRepository.findOne({where: {id: newsId}});

        return this.newsRepository
        .createQueryBuilder('news')
        //.leftJoinAndSelect(NewsImageEntity, 'image', 'image.newsId = news.id')
        .leftJoinAndSelect('news.image', 'image')
        .leftJoinAndSelect('news.document', 'document')
        .leftJoinAndSelect('news.auteur', 'auteur')
        //.where(' news.status = :status ', { status: /*'VISIBLE'*/ NewsType.VISIBLE})
        .where(' news.id = :newsId', { newsId })
        //.andWhere(' news.id = document.newsId')
        //.orderBy('news.showOrder')
        //.addOrderBy('news.createdAt DESC')
        .getOne();
    }

    async saveNews(news: NewsEntity): Promise<NewsEntity> 
    {
        return this.newsRepository.save(news);
    }

    async getNewsList(readAll: boolean): Promise<NewsEntity[]>
    {
        if(readAll===true)
        {
            logger.info('reading all news even visible or not');

            return this.newsRepository
                .createQueryBuilder('news')
                //.leftJoinAndSelect(NewsImageEntity, 'image', 'image.newsId = news.id')
                .leftJoinAndSelect('news.image', 'image')
                .leftJoinAndSelect('news.document', 'document')
                .leftJoinAndSelect('news.auteur', 'auteur')
                //.where(' news.status = :status ', { status: 'VISIBLE'})
                //.andWhere(' news.id = image.newsId')
                //.andWhere(' news.id = document.newsId')
                //.orderBy('news.showOrder', 'DESC')
                //.addOrderBy('news.createdAt DESC')
                .orderBy('news.createdAt', 'DESC')
                .getMany();
        }

        return this.newsRepository
            .createQueryBuilder('news')
            //.leftJoinAndSelect(NewsImageEntity, 'image', 'image.newsId = news.id')
            .leftJoinAndSelect('news.image', 'image')
            .leftJoinAndSelect('news.document', 'document')
            .leftJoinAndSelect('news.auteur', 'auteur')
            .where(' news.status = :status ', { status: NewsStatusType.VISIBLE })
            //.andWhere(' news.id = image.newsId')
            //.andWhere(' news.id = document.newsId')
            //.orderBy('news.showOrder', 'DESC')
            //.addOrderBy('news.createdAt DESC')
            .orderBy('news.createdAt', 'DESC')
            .getMany();
    }

    async delete(newsId): Promise<any>
    {
        return this.newsRepository.delete(newsId);
    }
}
