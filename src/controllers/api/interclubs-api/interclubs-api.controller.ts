import { Controller, Get, Request } from '@nestjs/common';
import { InterclubsSemaineEntity } from 'src/modules/repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsService } from 'src/modules/interclubs/services/interclubs.service';
import { InterclubsCategoryEntity } from 'src/modules/repository/interclubs/entities/interclubs-category.entity';
import { InterclubsDivisionEntity } from '../../../modules/repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../../modules/repository/interclubs/entities/interclubs-team.entity';

@Controller('interclubs')
export class InterclubsApiController {

    constructor(
        private readonly interclubsService: InterclubsService,
        ) {}
        
    // http://server/api/interclubs/listeSemainesInterclubs/dames
    @Get('listeInterclubsSemaines/:type')
    async getInterclubsSemaineByInterclubType(@Request() req): Promise< InterclubsSemaineEntity[] >
    {
        const interclubType= req.params.type;
        return this.interclubsService.getInterclubsSemaineByInterclubType(interclubType);
    }

    @Get('listeInterclubsCategories')
    async getInterclubsCategories(@Request() req): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsService.getInterclubsCategories();
    }

    @Get('listeInterclubsDivisions')
    async getInterclubsDivisions(@Request() req): Promise< InterclubsDivisionEntity[] >
    {
        return this.interclubsService.getInterclubsDivisions();
    }

    @Get('listeInterclubsTeams')
    async getInterclubsTeams(@Request() req): Promise< InterclubsTeamEntity[] >
    {
        return this.interclubsService.getInterclubsTeams();
    }

}
