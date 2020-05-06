import { Injectable, Logger } from '@nestjs/common';
import { InterclubsType } from '../enum/interclubs.enum';
import { InterclubsDivisionEntity } from '../../repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../repository/interclubs/entities/interclubs-team.entity';
import { InterclubsMatchEntity } from '../../repository/interclubs/entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from '../../repository/interclubs/entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from '../../repository/interclubs/entities/interclubs-ldf-by-category.entity';
import { InterclubsRepositoryService } from '../../repository/interclubs/services/interclubs-repository.service';
import { InterclubsSemaineEntity } from '../../repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from '../../repository/interclubs/entities/interclubs-category.entity';

import { InterclubsSemaineVersionEntity } from '../../repository/interclubs/entities/interclubs-semaine-version.entity';

import * as log4js from 'log4js';
import { plainToClass } from 'class-transformer';
const logger = log4js.getLogger('InterclubsService');


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

    async getSemaineNextVersion(semaineId: number): Promise< InterclubsSemaineVersionEntity >
    {
        /*const semaineVersion: InterclubsSemaineVersionEntity*/ 
        const rawData= await this.interclubsRepositoryService.getLastSemaineVersion(semaineId);
        
        if( Array.isArray(rawData) )
        {
            if(rawData.length===0)
            {
                logger.debug('no last semaine version for semaine ', semaineId);
                const newSemaineVersion = new InterclubsSemaineVersionEntity();
                newSemaineVersion.semaine_id=semaineId;
                newSemaineVersion.semaine_version=1;
                newSemaineVersion.semaine_version_statut='working';
                return this.interclubsRepositoryService.saveSemaineVersion(newSemaineVersion);
            }
            else
            {
                //const semaineVersion: InterclubsSemaineVersionEntity=rawData[0];
                
  /*               semaineVersion.id=undefined;
                semaineVersion.semaineVersion++;
                semaineVersion.semaineVersionStatut='working'; */
                const vv = plainToClass(InterclubsSemaineVersionEntity, rawData[0]);
                logger.debug('last semaine version', vv);
                let newSemaineVersion = new InterclubsSemaineVersionEntity();
                newSemaineVersion.semaine_id=semaineId;
                newSemaineVersion.semaine_version= 1+ Number(vv.semaine_version);
                newSemaineVersion.semaine_version_statut='working';
                logger.debug('saving semaine new version', newSemaineVersion);
                newSemaineVersion =  await this.interclubsRepositoryService.saveSemaineVersion(newSemaineVersion);
                vv.semaine_version_statut = 'closed';
                await this.interclubsRepositoryService.saveSemaineVersion(vv);
                return newSemaineVersion;
            }
        }

        return null;
    }   
}
