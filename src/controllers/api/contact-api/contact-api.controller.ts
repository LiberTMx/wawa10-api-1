import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { MessageDTO } from '../../../shared/dto/contact/message.dto';

import * as log4js from 'log4js';
import { validateSync } from 'class-validator';
import { ContactService } from '../../../modules/contact/services/contact/contact.service';
import { EmailDestinationType } from '../../../modules/mail/types/email-destination-type.enum';
const logger = log4js.getLogger('AuthApiController');

@Controller('contact')
export class ContactApiController 
{
    constructor(
        private readonly contactService: ContactService,
    ) {}

    @Post('sendMessage')
    async sendMessage(@Body() messageDTO: MessageDTO): Promise<any>
    {
        logger.debug('Receive a contact message:', messageDTO);

        const validationErrors = validateSync(messageDTO, { validationError: { target: false } });
        if (validationErrors !== null && validationErrors.length > 0 ) {
            logger.error('Contact message has errors!', validationErrors);
            throw new BadRequestException('Contact message validation error(s): ' + validationErrors);
        }

        messageDTO.destinationType=EmailDestinationType.TO_CLUB;
        return await this.contactService.sendMessage(messageDTO);
    }
}
