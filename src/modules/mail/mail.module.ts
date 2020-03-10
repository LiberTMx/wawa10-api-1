import { Module } from '@nestjs/common';
import { MailService } from './services/mail/mail.service';

@Module({
  exports:[MailService],
  providers: [MailService],
})
export class MailModule {}
