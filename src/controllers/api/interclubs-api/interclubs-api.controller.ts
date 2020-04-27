import { Controller, Get, Request } from '@nestjs/common';
import { InterclubsSemaineEntity } from 'src/modules/repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsService } from 'src/modules/interclubs/services/interclubs.service';
import { InterclubsCategoryEntity } from 'src/modules/repository/interclubs/entities/interclub-category.entity';

@Controller('interclubs')
export class InterclubsApiController {

    constructor(
        private readonly interclubsService: InterclubsService,
        ) {}
        
    // http://server/api/interclubs/listeSemainesInterclubs/dames
    @Get('listeSemainesInterclubs/:type')
    async getInterclubsSemaineByInterclubType(@Request() req): Promise< InterclubsSemaineEntity[] >
    {
        const interclubType= req.params.type;
        return this.interclubsService.getInterclubsSemaineByInterclubType(interclubType);
    }

    @Get('listeCategoryInterclubs')
    async getCategoryInterclubs(@Request() req): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsService.getInterclubsCategory();
    }
}
