import { Module } from '@nestjs/common';
import { SoapService } from './services/soap.service';

@Module({
  providers: [
    SoapService,
  ],
  exports: [
    SoapService,
  ],
})
export class SoapModule {}
