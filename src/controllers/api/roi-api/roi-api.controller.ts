import { Controller, Post, UseInterceptors, Request, Headers, UploadedFiles, BadRequestException, Res, Get } from '@nestjs/common';
import { ResponseMessage } from '../../../shared/dto/response-message.dto';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MessageType } from '../../../shared/message.enum';
import { ConfigurationService } from '../../../modules/configuration/configuration.service';

import { Response } from 'express';

import * as fileSystem from 'fs';
import * as path from 'path';

import * as log4js from 'log4js';
const logger = log4js.getLogger('StatusApiController');

@Controller('roi')
export class RoiApiController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
    ) {}

    @Post('createOrUpdate')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatarPdf', maxCount: 1 },
      ]))
    async createOrUpdateStatusFile(@Request() req, @UploadedFiles() files , @Headers() headers): Promise<ResponseMessage>
    {
        logger.debug('headers', headers);

        const user: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        if (user === null) 
        {
            throw new BadRequestException(MessageType.UNAUTHORIZED_ACCESS);
        }

        // let pdfDoc: NewsDocEntity=null;

        // ok la news existe bien, on peut ajouter l'image et/ou le pdf
        const statusDir=this.configurationService.get('roi_dir');
        logger.debug('status dir is:', statusDir);
        if( !fileSystem.existsSync(statusDir) )
        {
            logger.debug('Creating status dir:', statusDir);
            fileSystem.mkdirSync(statusDir, { recursive: true });
        }

        if( files && files.avatarPdf)
        {
            const avatarPdf=files.avatarPdf[0];
            logger.debug('avatarPdf is:', avatarPdf);

            const uploadedFilename='./files/'+avatarPdf.filename;
            const pdfFilename=statusDir+'/roi.pdf';
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

    @Get('downloadDocument')
    async downloadDocument(@Request() req, @Res() res: Response): Promise<any>
    {
        const statusDir=this.configurationService.get('roi_dir');
        const documentFilename=statusDir+'/roi.pdf';

        const documentFullPathName = path.resolve(documentFilename);

        logger.debug('Sending document file to client:', documentFilename);
        logger.debug('documentFullPathName:', documentFullPathName);

        const fileExists = fileSystem.existsSync(documentFullPathName);

        if( ! fileExists )
        {
            logger.warn('Document roi.pdf NOT found !');
            throw new BadRequestException('roi.pdf document not found!');
            //return null;
        }

        res.sendFile(documentFullPathName, (err) => {
            if(err) {
                logger.error('Error downloading file '+documentFilename, err);
                throw new BadRequestException('news document not found!');
            } 
        });
    }
}
