import { Controller, Get, Post, UseInterceptors, UploadedFiles, Request, Headers, BadRequestException, Res } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';

import * as fileSystem from 'fs';
import * as path from 'path';

import * as log4js from 'log4js';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { ResponseMessage } from '../../../shared/dto/response-message.dto';
import { MessageType } from '../../../shared/message.enum';
const logger = log4js.getLogger('ClubApiController');

@Controller('club')
export class ClubApiController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
    ) {}

    @Post('updateOrganisationPdfDocument')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatarPdf', maxCount: 1 },
      ]))
    async updateOrganisationPdfDocument(@Request() req, @UploadedFiles() files , @Headers() headers): Promise<ResponseMessage>
    {
        logger.debug('headers', headers);

        const user: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        if (user === null) 
        {
            throw new BadRequestException(MessageType.UNAUTHORIZED_ACCESS);
        }

        // ok on peut ajouter le pdf
        let dir=this.configurationService.get('club_dir');
        dir += '/organisation';
        logger.debug('organisation dir is:', dir);
        if( !fileSystem.existsSync(dir) )
        {
            logger.debug('Creating dir:', dir);
            fileSystem.mkdirSync(dir, { recursive: true });
        }

        if( files && files.avatarPdf)
        {
            const avatarPdf=files.avatarPdf[0];
            logger.debug('avatarPdf is:', avatarPdf);

            const uploadedFilename='./files/'+avatarPdf.filename;
            const pdfFilename=dir+'/organisation.pdf';
            let err1=null;
            fileSystem.rename(uploadedFilename, pdfFilename, (err) => {
                err1=err;
                if (err!==null)
                {
                    logger.error('Unable to rename pdf file ', err);
                }
            });
        }

        return new ResponseMessage('ok', '200');
    }

    @Get('organisationPdfDocument')
    async getOrganisationPdfDocument(@Request() req, @Res() res: Response): Promise<any>
    {
        let dir=this.configurationService.get('club_dir');
        dir += '/organisation';
        const documentFilename=dir+'/organisation.pdf';

        const documentFullPathName = path.resolve(documentFilename);

        logger.debug('Sending document file to client:', documentFilename);
        logger.debug('documentFullPathName:', documentFullPathName);

        const fileExists = fileSystem.existsSync(documentFullPathName);

        if( ! fileExists )
        {
            logger.warn('Document organisation.pdf NOT found !');
            //throw new BadRequestException('organisation.pdf document not found!');
            res.status(404).send('Document organisation.pdf NOT found !');
        }
        else
        {
            res.sendFile(documentFullPathName, (err) => {
                if(err) {
                    logger.error('Error downloading file '+documentFilename, err);
                    //throw new BadRequestException('news document not found!');
                    res.status(404).send('Error while loading the pdf doc' + err.message);
                } 
            });
        }
    }
}
