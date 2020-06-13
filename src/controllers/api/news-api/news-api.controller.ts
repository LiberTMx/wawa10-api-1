import { Controller, Post, Request, UploadedFiles, UseInterceptors, Body, Get, Res, BadRequestException, Query, Headers } from '@nestjs/common';
import { NewsService } from '../../../modules/news/services/news/news.service';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateNewsDTO } from '../../../shared/dto/news/create-news.dto';
import { NewsEntity } from '../../../modules/repository/news/entities/news.entity';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';

import * as fileSystem from 'fs';

import * as log4js from 'log4js';
import * as path from 'path';

import { NewsImageEntity } from '../../../modules/repository/news/entities/news-image.entity';
import { NewsDocEntity } from '../../../modules/repository/news/entities/news-doc.entity';
import { CreateNewsResponseDTO } from '../../../shared/dto/news/create-news-response.dto';
const logger = log4js.getLogger('AuthApiController');

import { Response } from 'express';
import { UpdateNewsStatusDTO } from '../../../shared/dto/news/update-news-status.dto';
import { validateSync } from 'class-validator';
import { MessageModel } from '../../../shared/message.model';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';

@Controller('news')
export class NewsApiController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
        private readonly newsService: NewsService,
    ) {}

    @Get('findById/:newsId')
    async findById(@Request() req): Promise<NewsEntity>
    {
        const newsId = req.params.newsId;
        return await this.newsService.findById(newsId);
    }

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'avatarPdf', maxCount: 1 },
      ]))
    async createNews(@Request() req, @UploadedFiles() files, @Body() createNewsDTO: CreateNewsDTO, @Headers() headers): Promise<CreateNewsResponseDTO>
    {
        logger.debug('files:', files);
        logger.debug('news create request body:', req.body);

        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsStageAdmin(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        const news: NewsEntity = await this.newsService.create(createNewsDTO);
        let newsImage: NewsImageEntity=null;
        let newsDoc: NewsDocEntity=null;
        
        if(news!==null && news!==undefined)
        {

            // ok la news existe bien, on peut ajouter l'image et/ou le pdf
            // .files/news_dir/1/jupiler.jpg
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

    @Get('liste')
    async getNewsList(@Query() query): Promise<NewsEntity[]>
    {
        const readAll = query.readAll;
        const all: boolean = (readAll!==null && readAll!==undefined && (readAll==='1' || readAll==='true') );
        logger.debug('news list - readAll:', all);
        return this.newsService.getNewsList(all);
    }

    @Get('downloadImage/:newsId')
    async downloadImage(@Request() req, @Res() res: Response): Promise<any>
    {
        const newsId = req.params.newsId;
        logger.debug('Downloading image for news:', newsId);
        const newsImage: NewsImageEntity = await this.newsService.findImageAttachedToNews(newsId);
        if(newsImage===null || newsImage===undefined) 
        {
            logger.debug('news image not found!');
            throw new BadRequestException('news image not found!');
        }

        const newsBaseDir=this.configurationService.get('news_dir');
        const newsDir=newsBaseDir+'/'+newsImage.newsId;
        const imageFilename=newsDir+'/'+newsImage.imageFilename;

        const imageFullPathName = path.resolve(imageFilename);

        logger.debug('Sending image file to client:', imageFilename);
        logger.debug('imageFullPathName:', imageFullPathName);

/*         res.sendFile(imageFilename, { root: '.' }, (err) => {
            if(err) logger.error('Error downloading file '+imageFilename, err);
        }); */

        res.sendFile(imageFullPathName, (err) => {
            if(err) {
                logger.error('Error downloading file '+imageFilename, err);
                throw new BadRequestException('news image not found!');
            } 
        });

        //res.end();
        //res.download(imageFilename);
    }

    @Get('downloadDocument/:newsId')
    async downloadDocument(@Request() req, @Res() res: Response): Promise<any>
    {
        const newsId = req.params.newsId;
        logger.debug('Downloading document for news:', newsId);
        const newsDocument: NewsDocEntity = await this.newsService.findDocumentAttachedToNews(newsId);
        if(newsDocument===null || newsDocument===undefined) 
        {
            logger.debug('news document not found!');
            throw new BadRequestException('news document not found!');
        }

        const newsBaseDir=this.configurationService.get('news_dir');
        const newsDir=newsBaseDir+'/'+newsDocument.newsId;
        const documentFilename=newsDir+'/'+newsDocument.docFilename;

        const documentFullPathName = path.resolve(documentFilename);

        logger.debug('Sending document file to client:', documentFilename);
        logger.debug('documentFullPathName:', documentFullPathName);

        res.sendFile(documentFullPathName, (err) => {
            if(err) {
                logger.error('Error downloading file '+documentFilename, err);
                throw new BadRequestException('news document not found!');
            } 
        });

    }

    @Post('updateStatus')
    async updateStatus(@Request() req, @Body() updateNewsStatusDTO: UpdateNewsStatusDTO): Promise<NewsEntity>
    {
        logger.debug('Updating the status of a news:', req.body);
        logger.debug('Updating the status of a news:', updateNewsStatusDTO);
        const validationErrors = validateSync(updateNewsStatusDTO, { validationError: { target: false } });
        if (validationErrors !== null && validationErrors.length > 0 ) {
          logger.error('UpdateStatus has errors!', validationErrors);
          throw new BadRequestException('UpdateStatus data validation error(s): ' + validationErrors);
        }
        return this.newsService.updateStatus(updateNewsStatusDTO);
    }

    @Post('delete')
    async delete(@Request() req, @Body() body): Promise<MessageModel>
    {
        const newsId = body.newsId;
        logger.debug('Delete a news:', newsId);
        const res= await this.newsService.delete(newsId);
        logger.debug('delete result is:', res);

        // supprimer les resources !
        const newsBaseDir=this.configurationService.get('news_dir');
        const newsDir=newsBaseDir+'/'+newsId;
        const newsFullPathName = path.resolve(newsDir);
        fileSystem.rmdirSync(newsFullPathName, { recursive: true });
        logger.info('Resource directory removed:', newsFullPathName);
        const message = new MessageModel();
        message.message=' news '+newsId+' has been deleted';
        message.code='200';
        return message;
    }
}
