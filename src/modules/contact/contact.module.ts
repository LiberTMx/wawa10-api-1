import { Module } from '@nestjs/common';
import { ContactService } from './services/contact/contact.service';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [
    ContactService,
  ],
  exports: [
    ContactService,
  ],
  imports: [
    MailModule,
  ],
})
export class ContactModule 
{
}
