import { Controller, Post, Request, UploadedFiles, UseInterceptors, Body, Get, Res, BadRequestException, Query, Headers } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';

import * as fileSystem from 'fs';
import * as log4js from 'log4js';
import * as path from 'path';
import { StageService } from '../../../modules/stage/services/stage/stage.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { CreateStageDTO } from '../../../shared/dto/stage/create-stage.dto';
import { StageEntity } from '../../../modules/repository/stage/entities/stage.entity';

const logger = log4js.getLogger('StageApiController');

@Controller('stage')
export class StageApiController 
{

    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
        private readonly stageService: StageService,
    ) {}
    
    @Post('createStage')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
      ]))
    async createStage(@Request() req, @UploadedFiles() files, @Body() createStageDTO: CreateStageDTO, @Headers() headers): Promise<StageEntity>
    {
        logger.debug('files:', files);
        logger.debug('createStage request body:', req.body);
        
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsStageAdmin(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }
        
        let stage: StageEntity = await this.stageService.createStage(createStageDTO, connectedUser);
        if(stage!==null && stage!==undefined)
        {

            // ok le stage existe bien, on peut ajouter l'image 
            const baseDir=this.configurationService.get('stages_dir');
            const dir=baseDir+'/'+stage.id;
            logger.debug('stages_dir is:', dir);
            if( !fileSystem.existsSync(dir) )
            {
                logger.debug('Creating stage dir:', dir);
                fileSystem.mkdirSync(dir, { recursive: true });
            }

            // stream the image if exists
            if( files && files.avatar)
            {
                const avatar=files.avatar[0];
                logger.debug('avatar is:', avatar);

                const uploadedFilename='./files/'+avatar.filename;
                const imageFilename=dir+'/'+avatar.originalname;
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
                    stage = await this.stageService.attachImageToStage(stage, avatar.originalname, avatar.mimetype);
                }
            }

        }
        return stage;
    }
}
