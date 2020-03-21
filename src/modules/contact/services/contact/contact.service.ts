import { Injectable } from '@nestjs/common';
import { MessageDTO } from '../../../../shared/dto/contact/message.dto';
import { MailService } from '../../../mail/services/mail/mail.service';
import { ResponseMessage } from '../../../../shared/dto/response-message.dto';

@Injectable()
export class ContactService 
{
    constructor(
        private readonly mailService: MailService,
    ) {}

    async sendMessage(messageDTO: MessageDTO): Promise<ResponseMessage>
    {
        if(this.canSendMessage(messageDTO))
        {
            this.mailService.sendMessage(messageDTO);
        }
        return new ResponseMessage('ok', '200');
    }

    canSendMessage(messageDTO: MessageDTO): boolean
    {
        return true;
    }
}
