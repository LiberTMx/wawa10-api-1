import { Controller, Post, Request, UploadedFiles, UseInterceptors, Body, Get, Res, BadRequestException, Query, Headers } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';
import { Response } from 'express';

import * as fileSystem from 'fs';
import * as log4js from 'log4js';
import * as path from 'path';
import { EntrainementService } from '../../../modules/entrainement/services/entrainement/entrainement.service';
import { CreateClasseDTO } from '../../../shared/dto/entrainement/create-classe.dto';
import { EntrainementClasseEntity } from '../../../modules/repository/entrainement/entities/entrainement-classe.entity';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
const logger = log4js.getLogger('EntrainementApiController');

@Controller('entrainement')
export class EntrainementApiController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
        private readonly entrainementService: EntrainementService,
    ) {}

    @Post('createClasse')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
      ]))
    async createClasse(@Request() req, @UploadedFiles() files, @Body() createClasseDTO: CreateClasseDTO, @Headers() headers): Promise<EntrainementClasseEntity>
    {
        logger.debug('files:', files);
        logger.debug('createClasse request body:', req.body);
        
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
        throw new BadRequestException('Unauthorized access');
        }
        
        let classe: EntrainementClasseEntity = await this.entrainementService.createClasse(createClasseDTO, connectedUser);
        if(classe!==null && classe!==undefined)
        {

            // ok la classe existe bien, on peut ajouter l'image 
            const classeBaseDir=this.configurationService.get('entrainement_classe_dir');
            const classeDir=classeBaseDir+'/'+classe.id;
            logger.debug('entrainement_classe_dir is:', classeDir);
            if( !fileSystem.existsSync(classeDir) )
            {
                logger.debug('Creating news dir:', classeDir);
                fileSystem.mkdirSync(classeDir, { recursive: true });
            }

            // stream the image if exists
            if( files && files.avatar)
            {
                const avatar=files.avatar[0];
                logger.debug('avatar is:', avatar);

                const uploadedFilename='./files/'+avatar.filename;
                const imageFilename=classeDir+'/'+avatar.originalname;
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
                    classe = await this.entrainementService.attachImageToClasse(classe, avatar.originalname, avatar.mimetype);
                }
            }

        }
        return classe;
    }

    // const apiUrl = `${url}/entrainement/classes?readAll=${readAll}`;
    @Get('classes')
    async getEntrainementClasses(@Query() query): Promise<EntrainementClasseEntity[]>
    {
        const readAll = query.readAll;
        const all: boolean = (readAll!==null && readAll!==undefined && (readAll==='1' || readAll==='true') );
        logger.debug('entrainement classe list - readAll:', all);
        return this.entrainementService.getEntrainementClasses(all);
    }

    @Get('downloadClasseImage/:imageFilename/:classeId')
    async downloadClasseImage(@Request() req, @Res() res: Response): Promise<any>
    {
        const pImageFilename = req.params.imageFilename;
        const pNewsId = req.params.classeId;
        /*
        logger.debug('Downloading image for classe:', imageFilename);
        const newsImage: NewsImageEntity = await this.newsService.findImageAttachedToClasse(classeId);
        if(newsImage===null || newsImage===undefined) 
        {
            logger.debug('news image not found!');
            throw new BadRequestException('news image not found!');
        }
        */

        const classeBaseDir=this.configurationService.get('entrainement_classe_dir');
        const classeDir=classeBaseDir+'/'+pNewsId;

        //const newsBaseDir=this.configurationService.get('entrainement_classe_dir');
        //const newsDir=newsBaseDir+'/'+newsImage.newsId;
        const imageFilename=classeDir+'/'+pImageFilename;

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

}
