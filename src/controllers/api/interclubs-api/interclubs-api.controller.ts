import { Controller, Get, Request, Post } from '@nestjs/common';
import { InterclubsDivisionEntity } from '../../../modules/repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../../modules/repository/interclubs/entities/interclubs-team.entity';
import { InterclubsMatchEntity } from '../../../modules/repository/interclubs/entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from '../../../modules/repository/interclubs/entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from '../../../modules/repository/interclubs/entities/interclubs-ldf-by-category.entity';
import { InterclubsService } from '../../../modules/interclubs/services/interclubs.service';
import { InterclubsSemaineEntity } from '../../../modules/repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from '../../../modules/repository/interclubs/entities/interclubs-category.entity';
import { InterclubsSemaineVersionEntity } from '../../../modules/repository/interclubs/entities/interclubs-semaine-version.entity';

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

    @Get('listeInterclubsMatches')
    async getInterclubsMatches(@Request() req): Promise< InterclubsMatchEntity[] >
    {
        return this.interclubsService.getInterclubsMatches();
    }

    @Get('LDFParticipants')
    async getInterclubsLDFParticipants(@Request() req): Promise< InterclubsLdfParticipantEntity[] >
    {
        return this.interclubsService.getInterclubsLDFParticipants();
    }

    @Get('LDFByCategory')
    async getInterclubsLDFByCategory(@Request() req): Promise< InterclubsLdfByCategoryEntity[] >
    {
        return this.interclubsService.getInterclubsLDFByCategory();
    }

    @Get('semaineNextVersion/:semaineId')
    async getSemaineNextVersion(@Request() req): Promise< InterclubsSemaineVersionEntity[] >
    {
        const semaineId = req.params.semaineId;
        return await this.interclubsService.getSemaineNextVersion(semaineId);
    }

    // const apiUrl=`${environment.apiUrl}/interclubs/semaineVersions/${semaine.id}`;
    @Get('semaineVersions/:semaineId')
    async getSemaineVersions(@Request() req): Promise< InterclubsSemaineVersionEntity[] >
    {
        const semaineId = req.params.semaineId;
        return await this.interclubsService.getSemaineVersions(semaineId);
    }

}
