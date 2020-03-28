import { Controller, Post, Request, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { NewsService } from '../../../modules/news/services/news/news.service';
import { ResponseMessage } from '../../../shared/dto/response-message.dto';

import * as log4js from 'log4js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateNewsDTO } from '../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../modules/repository/news/entities/news.entity';
const logger = log4js.getLogger('AuthApiController');

@Controller('news')
export class NewsApiController 
{
    constructor(
        private readonly newsService: NewsService,
    ) {}

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'avatarPdf', maxCount: 1 },
      ]))
    async createNews(@Request() req, @UploadedFiles() files, @Body() createNewsDTO: CreateNewsDTO): Promise<NewsEntity>
    {
        logger.debug('files:', files);
        logger.debug('news create request body:', req.body);
        const news: NewsEntity = await this.newsService.create(createNewsDTO);
        return news;
    }
}
