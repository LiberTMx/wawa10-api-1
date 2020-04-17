import { Controller, Get, Request } from '@nestjs/common';
import { ParametreService } from '../../../modules/parametre/services/parametre.service';
import { ParametreEntity } from '../../../modules/repository/parametre/entities/parameter.entity';

@Controller('parametre-api')
export class ParametreApiController 
{
    constructor(
        private readonly parametreService: ParametreService,
    ) {}

    @Get('parametres')
    async getAllParametres(@Request() req): Promise< ParametreEntity[] >
    {
      return await this.parametreService.getAllParametres();
    }

}
