import { Controller, Get, Post, Request, Logger } from '@nestjs/common';
import { SoapService } from '../../../modules/soap/services/soap.service';

@Controller('admin')
export class AdminApiController 
{
    constructor(
        private readonly soapService: SoapService,
      ) 
    {}

    @Get('teamList')
    async teamList(@Request() req): Promise<any> 
    {
      return await this.soapService.getTeamList();
    }
}
