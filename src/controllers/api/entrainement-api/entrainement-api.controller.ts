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
import { EntrainementClasseGroupeEntity } from '../../../modules/repository/entrainement/entities/entrainement-classe-groupe.entity';
import { CreateClasseGroupeDTO } from '../../../shared/dto/entrainement/create-classe-groupe.dto';
import { CreateGroupeSeanceDTO } from '../../../shared/dto/entrainement/create-groupe-seance.dto';
import { EntrainementGroupeSeanceEntity } from '../../../modules/repository/entrainement/entities/entrainement-groupe-seance.entity';
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
        const isUserClubAdmin=this.authService.verifyUserIsStageAdmin(connectedUser);
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
                logger.debug('Creating classe dir:', classeDir);
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

    @Post('updateClasse')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
      ]))
    async updateClasse(@Request() req, @UploadedFiles() files, @Body() createClasseDTO: CreateClasseDTO, @Headers() headers): Promise<EntrainementClasseEntity>
    {
        logger.debug('files:', files);
        logger.debug('updateClasse request body:', req.body);

        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsStageAdmin(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }
        
        let classe: EntrainementClasseEntity = await this.entrainementService.updateClasse(createClasseDTO, connectedUser);
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

    // const apiUrl = `${url}/entrainement/classe/:classeId=${classeId}`;
    @Get('classe/:classeId')
    async getEntrainementClasse(@Request() req): Promise<EntrainementClasseEntity>
    {
        const classeId = req.params.classeId;
        return this.entrainementService.getEntrainementClasseById(classeId);
    }

    // const apiUrl = `${url}/entrainement/classeGroupes/${classeId}`;
    @Get('classeGroupes/:classeId')
    async getEntrainementClasseGroupes(@Request() req): Promise<EntrainementClasseGroupeEntity[]>
    {
        const classeId = req.params.classeId;
        return this.entrainementService.getEntrainementClasseGroupes(classeId);
    }

    // const apiUrl=`${environment.apiUrl}/entrainement/createClasseGroupe`;
    
    @Post('createClasseGroupe')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
      ]))
    async createClasseGroupe(@Request() req, @UploadedFiles() files, @Body() createClasseGroupeDTO: CreateClasseGroupeDTO, @Headers() headers): Promise<EntrainementClasseGroupeEntity>
    {
        //logger.debug('files:', files);
        //logger.debug('createClasseGroupe request body:', req.body);
        
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsStageAdmin(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }
        
        let groupe: EntrainementClasseGroupeEntity = await this.entrainementService.createClasseGroupe(createClasseGroupeDTO, connectedUser);
        if(groupe!==null && groupe!==undefined)
        {

            // ok la classe existe bien, on peut ajouter l'image 
            const classeBaseDir=this.configurationService.get('entrainement_classe_dir');
            const classeDir=classeBaseDir+'/'+createClasseGroupeDTO.classeId;
            logger.debug('entrainement_classe_dir is:', classeDir);

            // groupe dir is a sub-dir of the classe
            const groupeDir = classeDir + '/groupes/'+groupe.id;
            if( !fileSystem.existsSync(groupeDir) )
            {
                logger.debug('Creating news dir:', groupeDir);
                fileSystem.mkdirSync(groupeDir, { recursive: true });
            }

            // stream the image if exists
            if( files && files.avatar)
            {
                const avatar=files.avatar[0];
                logger.debug('avatar is:', avatar);

                const uploadedFilename='./files/'+avatar.filename;
                const imageFilename=groupeDir+'/'+avatar.originalname;
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
                    groupe = await this.entrainementService.attachImageToClasseGroupe(groupe, avatar.originalname, avatar.mimetype);
                }
            }

        }
        return groupe;
    }

    // const apiUrl = `${url}/entrainement/downloadClasseGroupeImage/${groupe.classeId}/${groupe.id}/${groupe.imageFilename}`;
    @Get('downloadClasseGroupeImage/:classeId/:groupeId/:imageFilename')
    async downloadClasseGroupeImage(@Request() req, @Res() res: Response): Promise<any>
    {
        const pClasseId = req.params.classeId;
        const pGroupeId = req.params.groupeId;
        const pImageFilename = req.params.imageFilename;

        const classeBaseDir=this.configurationService.get('entrainement_classe_dir');
        const classeDir=classeBaseDir+'/'+pClasseId;
        const groupeDir = classeDir + '/groupes/'+pGroupeId;

        const imageFilename=groupeDir+'/'+pImageFilename;

        const imageFullPathName = path.resolve(imageFilename);

        logger.debug('Sending image file to client:', imageFilename);
        logger.debug('imageFullPathName:', imageFullPathName);

        res.sendFile(imageFullPathName, (err) => {
            if(err) {
                logger.error('Error downloading file '+imageFilename, err);
                throw new BadRequestException('news image not found!');
            } 
        });

    }

    // const apiUrl=`${environment.apiUrl}/entrainement/createGroupeSeance`;
    @Post('createGroupeSeance')
    async createGroupeSeance(@Request() req, @Body() createGroupeSeanceDTO: CreateGroupeSeanceDTO, @Headers() headers): Promise<EntrainementGroupeSeanceEntity>
    {
        logger.debug('createGroupeSeance request body:', req.body);
        logger.debug('createGroupeSeance createGroupeSeanceDTO:', createGroupeSeanceDTO);
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        return await this.entrainementService.createGroupeSeance(createGroupeSeanceDTO, connectedUser);
    }

    // const apiUrl = `${url}/entrainement/groupeSeances/${groupeId}`;
    @Get('groupeSeances/:groupeId')
    async getGroupeSeances(@Request() req): Promise<EntrainementGroupeSeanceEntity[]>
    {
        const groupeId = req.params.groupeId;
        return this.entrainementService.getEntrainementGroupeSeances(groupeId);
    }
}
