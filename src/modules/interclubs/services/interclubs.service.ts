import { Injectable } from '@nestjs/common';
import { InterclubsType } from '../enum/interclubs.enum';
import { InterclubsDivisionEntity } from '../../repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../repository/interclubs/entities/interclubs-team.entity';
import { InterclubsMatchEntity } from '../../repository/interclubs/entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from '../../repository/interclubs/entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from '../../repository/interclubs/entities/interclubs-ldf-by-category.entity';
import { InterclubsRepositoryService } from '../../repository/interclubs/services/interclubs-repository.service';
import { InterclubsSemaineEntity } from '../../repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from '../../repository/interclubs/entities/interclubs-category.entity';

@Injectable()
export class InterclubsService 
{
    constructor(
        private readonly interclubsRepositoryService: InterclubsRepositoryService,
    ) {}

    /*
    async getAllinterclubss(): Promise< InterclubsEntity[] >
    {
        return this.interclubsRepositoryService.getAllinterclubss();
    }

    async findinterclubsByKey(interclubsType: InterclubsType): Promise< InterclubsEntity >
    {
        return this.interclubsRepositoryService.findinterclubsByKey(interclubsType);
    }
    */

    async getInterclubsSemaineByInterclubType(interclubsType: InterclubsType): Promise< InterclubsSemaineEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsSemaineByInterclubType(interclubsType);
    }

    async getInterclubsCategories(): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsCategories();
    }

    async getIntergetInterclubsDivisionsclubsTeams(): Promise< InterclubsDivisionEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsDivisions();
    }

    async getInterclubsDivisions(): Promise< InterclubsDivisionEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsDivisions();
    }

    async getInterclubsTeams(): Promise< InterclubsTeamEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsTeams();
    }

    async getInterclubsMatches(): Promise< InterclubsMatchEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsMatches();
    }

    async getInterclubsLDFParticipants(): Promise< InterclubsLdfParticipantEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsLDFParticipants();
    }

    async getInterclubsLDFByCategory(): Promise< InterclubsLdfByCategoryEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsLDFByCategory();
    }
}
