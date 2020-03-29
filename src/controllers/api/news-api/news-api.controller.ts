import { Controller, Post, Request, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { NewsService } from '../../../modules/news/services/news/news.service';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateNewsDTO } from '../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../modules/repository/news/entities/news.entity';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';

import * as fileSystem from 'fs';

import * as log4js from 'log4js';
import { NewsImageEntity } from '../../../modules/repository/news/entities/news-image.entity';
import { NewsDocEntity } from '../../../modules/repository/news/entities/news-doc.entity';
import { CreateNewsResponseDTO } from '../../../shared/dto/news/create-news-response.dto';
const logger = log4js.getLogger('AuthApiController');

@Controller('news')
export class NewsApiController 
{
    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly newsService: NewsService,
    ) {}

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'avatarPdf', maxCount: 1 },
      ]))
    async createNews(@Request() req, @UploadedFiles() files, @Body() createNewsDTO: CreateNewsDTO): Promise<CreateNewsResponseDTO>
    {
        logger.debug('files:', files);
        logger.debug('news create request body:', req.body);
        const news: NewsEntity = await this.newsService.create(createNewsDTO);
        let newsImage: NewsImageEntity=null;
        let newsDoc: NewsDocEntity=null;
        
        if(news!==null && news!==undefined)
        {

            // ok la news existe bien, on peut ajouter l'image et/ou le pdf
            const newsBaseDir=this.configurationService.get('news_dir');
            const newsDir=newsBaseDir+'/'+news.id;
            logger.debug('news dir is:', newsDir);
            if( !fileSystem.existsSync(newsDir) )
            {
                logger.debug('Creating news dir:', newsDir);
                fileSystem.mkdirSync(newsDir, { recursive: true });
            }

            // stream the image if exists
            if( files && files.avatar)
            {
                const avatar=files.avatar[0];
                logger.debug('avatar is:', avatar);

                const uploadedFilename='./files/'+avatar.filename;
                const imageFilename=newsDir+'/'+avatar.originalname;
                let err1=null;
                fileSystem.rename(uploadedFilename, imageFilename, (err) => {
                    err1=err;
                    if (err!==null)
                    {
                        logger.error('Unable to rename image file ', err);
                    }
                });

                if(err1===null)
                {
                    newsImage = await this.newsService.attachImageToNews(news, avatar.originalname, avatar.mimetype);
                }
            }

            if( files && files.avatarPdf)
            {
                const avatarPdf=files.avatarPdf[0];
                logger.debug('avatarPdf is:', avatarPdf);

                const uploadedFilename='./files/'+avatarPdf.filename;
                const pdfFilename=newsDir+'/'+avatarPdf.originalname;
                let err1=null;
                fileSystem.rename(uploadedFilename, pdfFilename, (err) => {
                    err1=err;
                    if (err!==null)
                    {
                        logger.error('Unable to rename pdf file ', err);
                    }
                });
    
                if(err1===null)
                {
                    newsDoc = await this.newsService.attachDocToNews(news, avatarPdf.originalname, avatarPdf.mimetype);
                }
            }
        }
        return new CreateNewsResponseDTO(news, newsImage, newsDoc);
    }
}
