import { Injectable } from '@nestjs/common';
import { AfttRepositoryService } from '../../../repository/aftt/services/aftt-repository.service';
import { AfttAllDataEntity } from '../../../repository/aftt/entities/aftt-all-data.entity';
import {plainToClass} from 'class-transformer';

import * as log4js from 'log4js';
import { AfttTeamEntity } from '../../../repository/aftt/entities/aftt-team.entity';
import { AfttDivisionEntity } from '../../../repository/aftt/entities/aftt-division.entity';
import { AfttMatchEntity } from '../../../repository/aftt/entities/aftt-match.entity';
import { AfttDivisionCategoryEntity } from '../../../repository/aftt/entities/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from '../../../repository/aftt/entities/aftt-member-by-category.entity';
import { AfttWeekByCategory } from '../../../repository/aftt/entities/aftt-week-by-category.entity';
import { WeekInfo } from '../../../../shared/week.info';
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

    async getLastAfttSyncId(): Promise<AfttAllDataEntity>
    {
        const rawData = await this.afttRepositoryService.getLastAfttSyncId();

        if( Array.isArray(rawData) )
        {
            logger.debug('rawdata is an array ! size:'+rawData.length);
            const r0 = rawData[0];
            logger.debug('r0 id='+r0.id);
            const e1: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData[0]);
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
 
        const e: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData);

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
        return await this.afttRepositoryService.saveAfttDivision(division);
    }

    async saveAfttMatch(match: AfttMatchEntity): Promise<AfttMatchEntity>
    {
        return await this.afttRepositoryService.saveAfttMatch(match);
    }

    async getDivisionCategoryList(): Promise<AfttDivisionCategoryEntity[]>
    {
        return await this.afttRepositoryService.getDivisionCategoryList();
    }

    async saveAfttMemberByCategory(membre: AfttMemberByCategoryEntity): Promise<AfttMemberByCategoryEntity>
    {
        return await this.afttRepositoryService.saveAfttMemberByCategory(membre);
    }

    async getAfttDivisions(syncId: number): Promise<AfttDivisionEntity[]>
    {
        return await this.afttRepositoryService.getAfttDivisions(syncId);
    }

    async getAfttTeams(syncId: number): Promise<AfttTeamEntity[]>
    {
      return await this.afttRepositoryService.getAfttTeams(syncId);
    }

    async getAfttMembers(syncId: number): Promise<AfttMemberByCategoryEntity[]>
    {
      return await this.afttRepositoryService.getAfttMembers(syncId);
    }

    async getAfttMatches(syncId: number): Promise<AfttMatchEntity[]>
    {
      return await this.afttRepositoryService.getAfttMatches(syncId);
    }

    async findDivisionById(divisionId: number): Promise<AfttDivisionEntity>
    {
        return await this.afttRepositoryService.findDivisionById(divisionId);
    }

    async deleteAllWeeks(syncId: number)
    {
        await this.afttRepositoryService.deleteAllWeeks(syncId);
    }

    async createAfttWeek(syncId: number, category: AfttDivisionCategoryEntity, weekInfo: WeekInfo): Promise<AfttWeekByCategory>
    {
        const week=new AfttWeekByCategory();
        week.lastSyncId=syncId;
        week.divisionCategoryId=category.id;
        Object.assign(week, weekInfo);
        return await this.saveAfttWeek(week);
    }

    async saveAfttWeek(week: AfttWeekByCategory): Promise<AfttWeekByCategory>
    {
        return await this.afttRepositoryService.saveAfttWeek(week);
    }

    async getAfttWeeks(syncId: number): Promise<AfttWeekByCategory[]>
    {
      return await this.afttRepositoryService.getAfttWeeks(syncId);
    }

    async updateTeamsInMatchesForSync(syncId: number, clubName: string, teamNamePrefix: string, clubIndice: string)
    {
        const matches: AfttMatchEntity[] = await this.afttRepositoryService.getAfttMatches(syncId);
        
        if(matches === null || matches=== undefined || matches.length === 0 ) return;

        for(const match of matches)
        {
            // let val: {TeamId: string} = { TeamId: null};

            match.homeTeamId = null;
            const homeTeamId = await this.afttRepositoryService.findHomeTeamIdForMatch(syncId, teamNamePrefix, match, clubIndice);
            if ( homeTeamId !== null && homeTeamId !== undefined && Array.isArray(homeTeamId) )
            {
                logger.debug('teamIs IS an array, size:'+homeTeamId.length);
                let ix=0;
                for ( const obj of homeTeamId)
                {   
                    logger.debug('homeTeam['+ix+'] ', homeTeamId[ix]);
                    ix++;
                }

                if ( homeTeamId.length > 0 )
                {
                    match.homeTeamId = homeTeamId[0].TeamId;
                }
            }

            match.awayTeamId = null;
            const awayTeamId = await this.afttRepositoryService.findAwayTeamIdForMatch(syncId, teamNamePrefix, match, clubIndice);
            if ( awayTeamId !== null && awayTeamId !== undefined && Array.isArray(awayTeamId) )
            {
                logger.debug('teamIs IS an array, size:'+awayTeamId.length);
                let ix=0;
                for ( const obj of awayTeamId)
                {   
                    logger.debug('awayTeam['+ix+'] ', awayTeamId[ix]);
                    ix++;
                }

                if ( awayTeamId.length > 0 )
                {
                    match.awayTeamId = awayTeamId[0].TeamId;
                }
            }
            
            const newMatch = await this.afttRepositoryService.saveAfttMatch(match);
            logger.debug('Match after team ids assigned:', newMatch);
        }
        //await this.afttRepositoryService.updateTeamsInMatchesForSync(syncId, clubName, teamNamePrefix);
    }
}
