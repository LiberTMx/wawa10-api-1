import { Controller, Get } from '@nestjs/common';

@Controller('club')
export class ClubApiController 
{
    @Get('test')
    async test(): Promise<any>
    {
        return 'ok';
    }
}
