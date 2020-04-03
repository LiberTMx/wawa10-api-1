import { Injectable } from '@nestjs/common';
import { AfttRepositoryService } from '../../../repository/aftt/services/aftt-repository.service';
import { AfttAllDataEntity } from '../../../repository/aftt/entities/aftt-all-data.entity';
import {plainToClass} from 'class-transformer';

import * as log4js from 'log4js';
import { AfttTeamEntity } from '../../../repository/aftt/entities/aftt-team.entity';
import { AfttDivisionEntity } from '../../../repository/aftt/entities/aftt-division.entity';
const logger = log4js.getLogger('AdminService');

@Injectable()
export class AdminService 
{
    constructor(
        private readonly afttRepositoryService: AfttRepositoryService,
    ) {}

    async createAfttAllData(teams: string, divisions: string, matches: string, membres: string): Promise<AfttAllDataEntity>
    {
        return await this.afttRepositoryService.createAfttAllData(teams, divisions, matches, membres);
    }

    async getLastAfttSync(): Promise<AfttAllDataEntity>
    {
        const rawData = await this.afttRepositoryService.getLastAfttSync();

        if( Array.isArray(rawData) )
        {
            logger.debug('rawdata is an array ! size:'+rawData.length);
            const r0 = rawData[0];
            logger.debug('r0 id='+r0.id);
            const e1: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData[0]);
            //logger.debug('e1:', e1);
            //const rr = new AfttAllDataEntity();
            
            return e1;
        }
        else
        {
            logger.debug('rawdata is NOT an array ! ');
            if( typeof rawData === 'string' )
            {
                logger.debug('rawdata is a string ! ', rawData.length, rawData);
            }
            else if( typeof rawData === 'object' )
            {
                logger.debug('rawdata is an object ! ');
                logger.debug(rawData);
                this.printTypeNames(rawData);
            }
        }
            /*
        logger.debug('rawData:', rawData);
        const e: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData);

        logger.debug('e:', e);
        */

        //logger.debug('rawData:', rawData);
        const e: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData);

        /*
        this.printTypeNames(e);
        const e0=e[0];
        logger.debug('e0', e0);
        logger.debug('e.id:', e.id);
        */
        return e;
    }
    printTypeNames<T>(obj: T) 
    {
        const objectKeys = Object.keys(obj) as Array<keyof T>;
        for (const key of objectKeys)
        {
            logger.debug('key:' + key);
        }
    }

    async removeAllAfttDataForSync(syncId: number)
    {
        await this.afttRepositoryService.removeAllAfttDataForSync(syncId);
    }

    async saveAfttTeam(team: AfttTeamEntity): Promise<AfttTeamEntity>
    {
        return await this.afttRepositoryService.saveAfttTeam(team);
    }

    async saveAfttDivision(division: AfttDivisionEntity): Promise<AfttDivisionEntity>
    {
        return this.afttRepositoryService.saveAfttDivision(division);
    }
}
