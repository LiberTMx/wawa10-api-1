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
import { InterclubsRepositoryService } from '../../../repository/interclubs/services/interclubs-repository.service';
import { InterclubsCategoryEntity } from '../../../repository/interclubs/entities/interclubs-category.entity';
import { ResponseMessage } from '../../../../shared/dto/response-message.dto';
import { InterclubsSemaineEntity } from '../../../repository/interclubs/entities/interclubs-semaine.entity';
import { AfttMatchTypeEntity } from '../../../repository/aftt/entities/aftt-match-type.entity';
import { InterclubsDivisionEntity } from '../../../repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../../repository/interclubs/entities/interclubs-team.entity';
import { InterclubsMatchEntity } from '../../../repository/interclubs/entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from '../../../repository/interclubs/entities/interclubs-ldf-participant.entity';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { InterclubsLdfByCategoryEntity } from '../../../repository/interclubs/entities/interclubs-ldf-by-category.entity';
const logger = log4js.getLogger('AdminService');

@Injectable()
export class AdminService 
{
    constructor(
        private readonly afttRepositoryService: AfttRepositoryService,
        private readonly authService: AuthService,
        private readonly interclubsRepositoryService: InterclubsRepositoryService,
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
            if(rawData.length === 0) return null;
            const r0 = rawData[0];
            if(r0!==null || r0!==undefined)
            {
                logger.debug('r0 id='+r0.id);
                const e1: AfttAllDataEntity= plainToClass(AfttAllDataEntity, rawData[0]);
                return e1;
            }
            return null;
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

    async importInterclubsCategoriesFromAfttToClub(): Promise<ResponseMessage>
    {
        // Il faut avoir les infos sur le last sync id !
        // const lastSyncID = await this.getLastAfttSync(); >> Pas nécessaire, c'est une table de réference, indépendante de syncId !

        const response = new ResponseMessage('ok', '200');

        const afttCategories: AfttDivisionCategoryEntity[]=await this.afttRepositoryService.getDivisionCategoryList();

        if(afttCategories!==null && afttCategories!==undefined)
        {
            for(const afttCat of afttCategories)
            {
                let clubCat = await this.interclubsRepositoryService.getInterclubCategoryByPlayerCategory(afttCat.playercategory);
                if(clubCat===null || clubCat===undefined)
                {
                    // Ok on crae une nouvelle entité
                    const newClubCat = new InterclubsCategoryEntity();
                    //Object.assign(newClubCat, afttCat); >> Not working here !
                    newClubCat.name=afttCat.name;
                    newClubCat.classementCategory=afttCat.classementcategory;
                    newClubCat.playerCategory=afttCat.playercategory;
                    newClubCat.divisionNamePrefix=afttCat.division_name_prefix;
                    newClubCat.firstSeason=afttCat.first_season;
                    newClubCat.lastSeason=afttCat.last_season;
                    newClubCat.order=afttCat.order;
                    clubCat = await this.interclubsRepositoryService.saveInterclubCategory(newClubCat);
                    response.message += ', Created cat \' '+clubCat.name + '\'';
                }
                else
                {
                    // En principe rien à faire sauf si le libellé a changé !!!
                    if(clubCat.name !== afttCat.name )
                    {
                        response.message += ', update cat name from \' ' + clubCat.name + '\' to \' ' + afttCat.name + '\'';
                        clubCat.name = afttCat.name;
                        clubCat.classementCategory=afttCat.classementcategory;
                        clubCat.divisionNamePrefix=afttCat.division_name_prefix;
                        clubCat.firstSeason=afttCat.first_season;
                        clubCat.lastSeason=afttCat.last_season;
                        clubCat.order=afttCat.order;
                        clubCat = await this.interclubsRepositoryService.saveInterclubCategory(clubCat);
                    }
                    else
                    {
                        response.message += ', cat \' ' + clubCat.name + '\' is uptodate';
                    }
                }
            }
        }
        else
        {
            response.message='ok, but no data found in AFTT reference table !';
        }

        return response;
    }

    async importInterclubsSemainesFromAfttToClub(): Promise<ResponseMessage>
    {
        const response = new ResponseMessage('ok', '200');

        const lastSync =  await this.getLastAfttSyncId();
        const afttSemaines: AfttWeekByCategory[]=await this.afttRepositoryService.getAfttWeeks(lastSync.id);

        if(afttSemaines!==null && afttSemaines!==undefined)
        {
            for(const afttSem of afttSemaines)
            {
                let clubSem = await this.interclubsRepositoryService.findInterclubSemaineByCategoryAndWeekNumber(afttSem.divisionCategoryId, afttSem.weekNumber, afttSem.year);
                if(clubSem===null || clubSem===undefined)
                {
                    // Ok on crae une nouvelle entité
                    const newClubSem = new InterclubsSemaineEntity();
                    //Object.assign(newClubCat, afttCat); >> Not working here !
                    newClubSem.afftDivisionCategoryId=afttSem.divisionCategoryId;
                    newClubSem.weekName=afttSem.weekName;
                    newClubSem.weekNumber=afttSem.weekNumber;
                    newClubSem.year=afttSem.year;
                    newClubSem.startOfWeek=afttSem.startOfWeek;
                    newClubSem.endOfWeek=afttSem.endOfWeek;
                    clubSem = await this.interclubsRepositoryService.saveInterclubSemaine(newClubSem);
                    response.message += ', Created sem \' '+newClubSem.weekName + '\'';
                }
                else
                {
                    // En principe rien à faire sauf si le libellé a changé !!!
                    if(clubSem.startOfWeek !== afttSem.startOfWeek || clubSem.endOfWeek !== afttSem.endOfWeek)
                    {
                        response.message += ', update cat name from ' + clubSem.startOfWeek +', '+ clubSem.endOfWeek
                        + ' to ' + afttSem.startOfWeek + ', '+ afttSem.endOfWeek;
                        clubSem.startOfWeek=afttSem.startOfWeek;
                        clubSem.endOfWeek=afttSem.endOfWeek;
                        clubSem = await this.interclubsRepositoryService.saveInterclubSemaine(clubSem);
                    }
                    else
                    {
                        response.message += ', cat \' ' + clubSem.weekName + '\' is uptodate';
                    }
                }
            }
        }
        else
        {
            response.message='ok, but no data found in AFTT reference table !';
        }

        return response;
    }

    async getMatchTypes(): Promise< AfttMatchTypeEntity[] >
    {
        return this.afttRepositoryService.getMatchTypes();
    }

    async importInterclubsDivisionsFromAfttToClub(): Promise<ResponseMessage>
    {
        const response = new ResponseMessage('ok', '200');

        const lastSync =  await this.getLastAfttSyncId();
        const matchTypes: AfttMatchTypeEntity[] = await this.getMatchTypes();

        const afttDivisions: AfttDivisionEntity[] = await this.getAfttDivisions(lastSync.id);

        if(afttDivisions !== null && afttDivisions !== undefined)
        {
            let matchType: AfttMatchTypeEntity=null;

            for(const afttDiv of afttDivisions)
            {
                matchType=matchTypes.find( t => t.matchType === afttDiv.MatchType);
                if(matchType && matchType.supportedByClub === false )
                {
                    logger.warn('skipping division - match type not supported !', afttDiv);
                    continue;
                }

                let clubDiv: InterclubsDivisionEntity = await this.interclubsRepositoryService.findInterclubsDivisionByAfttDivisionId(afttDiv.DivisionId);

                if(clubDiv===null || clubDiv===undefined)
                {
                    const newClubDiv=new InterclubsDivisionEntity();
                    newClubDiv.DivisionCategory=afttDiv.DivisionCategory;
                    newClubDiv.DivisionId=afttDiv.DivisionId;
                    newClubDiv.DivisionName=afttDiv.DivisionName;
                    newClubDiv.Level=afttDiv.Level;
                    newClubDiv.MatchType=afttDiv.MatchType;
                    clubDiv=await this.interclubsRepositoryService.saveInterclubsDivision(newClubDiv);
                }
                else
                {
                    // do nothing ?
                }
            }
        }

        return response;
    }

    async importInterclubsTeamsFromAfttToClub(): Promise<ResponseMessage>
    {
        const response = new ResponseMessage('ok', '200');

        const lastSync =  await this.getLastAfttSyncId();
        const matchTypes: AfttMatchTypeEntity[] = await this.getMatchTypes();

        const afttTeams: AfttTeamEntity[] = await this.getAfttTeams(lastSync.id);

        if(afttTeams !== null && afttTeams !== undefined)
        {
            let matchType: AfttMatchTypeEntity=null;

            for(const afttTeam of afttTeams)
            {
                matchType=matchTypes.find( t => t.matchType === afttTeam.MatchType);
                if(matchType && matchType.supportedByClub === false )
                {
                    logger.warn('skipping team - match type not supported !', afttTeam);
                    continue;
                }

                let clubTeam: InterclubsTeamEntity = await this.interclubsRepositoryService.findInterclubsTeamByAfttTeamId(afttTeam.TeamId);

                if(clubTeam===null || clubTeam===undefined)
                {
                    const newClubTeam=new InterclubsTeamEntity();
                    newClubTeam.TeamId=afttTeam.TeamId;
                    newClubTeam.Team=afttTeam.Team;
                    newClubTeam.DivisionId=afttTeam.DivisionId;
                    newClubTeam.DivisionName=afttTeam.DivisionName;
                    newClubTeam.DivisionCategory=afttTeam.DivisionCategory;
                    newClubTeam.MatchType=afttTeam.MatchType;
                    clubTeam=await this.interclubsRepositoryService.saveInterclubsTeam(newClubTeam);
                }
                else
                {
                    // do nothing ?
                }
            }
        }
        return response;
    }

    async importInterclubsMatchesFromAfttToClub(): Promise<ResponseMessage>
    {
        const response = new ResponseMessage('ok', '200');

        const lastSync =  await this.getLastAfttSyncId();

        const clubTeams: InterclubsTeamEntity[] = await this.interclubsRepositoryService.getInterclubsTeams();
        if(clubTeams!==null && clubTeams!==undefined)
        {
            for(const clubTeam of clubTeams)
            {
                const afttMatchesForClubTeam: AfttMatchEntity[] = await this.afttRepositoryService.findAfttMatchesForClubTeam(clubTeam, lastSync.id);

                if(afttMatchesForClubTeam!==null && afttMatchesForClubTeam!==undefined)
                {
                    for(const afttMatch of afttMatchesForClubTeam)
                    {
                        let clubMatch: InterclubsMatchEntity = await this.interclubsRepositoryService.findInterclubsMatchByMatchId(afttMatch);
                        if(clubMatch===null || clubMatch===undefined)
                        {
                            const newClubMatch = new InterclubsMatchEntity();
                            Object.assign(newClubMatch, afttMatch);
                            // Attention ! Ne pas utilisrla valeur de l'id de afttMatch !
                            newClubMatch.id=undefined;
                            clubMatch=await this.interclubsRepositoryService.saveInterclubMatch(newClubMatch);
                        }

                    }
                }
            }
        }

        return response;
    }

    async importInterclubsAllLDFFromAfttToClub(): Promise<ResponseMessage>
    {
        const response = new ResponseMessage('ok', '200');

        const lastSync =  await this.getLastAfttSyncId();

        const afttMembres: AfttMemberByCategoryEntity[] = await this.getAfttMembers(lastSync.id);

        if(afttMembres!==null && afttMembres!==undefined)
        {
            for(const afttMembre of afttMembres)
            {
                const licence = String(afttMembre.UniqueIndex);
                let ldfParticipant: InterclubsLdfParticipantEntity=await this.interclubsRepositoryService
                                                                .findInterclubsLdfParticipantByLicence( licence );

                if(ldfParticipant===null || ldfParticipant===undefined)
                {
                    const user = await this.authService.findUserByLicence(licence);

                    // participant not foound: on crée tout
                    const newParticipant=new InterclubsLdfParticipantEntity();
                    newParticipant.nom=afttMembre.LastName;
                    newParticipant.prenom=afttMembre.FirstName;
                    newParticipant.sexe=afttMembre.Gender;
                    newParticipant.licence= licence;
                    newParticipant.authUserId=(user!==null && user!==undefined)?user.id : null;
                    newParticipant.statut=afttMembre.Status;
                    newParticipant.playerCategory=String(afttMembre.divisionCategory);
                    newParticipant.medicalAttestation=afttMembre.MedicalAttestation;

                    await this.interclubsRepositoryService.saveInterclubsLdfParticipant(newParticipant);
                    ldfParticipant=await this.interclubsRepositoryService.findInterclubsLdfParticipantByLicence( licence );
                }

                // recherche ldfCategory pour ce participant et cette categorie
                let ldfCategory: InterclubsLdfByCategoryEntity
                    =await this.interclubsRepositoryService.findInterclubsLdfByCategory( ldfParticipant.id, afttMembre.divisionCategory);
                
                if(ldfCategory===null || ldfCategory===undefined)
                {
                    const newLdfCategory=new InterclubsLdfByCategoryEntity();
                    newLdfCategory.participantId=ldfParticipant.id;
                    newLdfCategory.playerCategory=afttMembre.divisionCategory;
                    newLdfCategory.position=afttMembre.Position;
                    newLdfCategory.classement=afttMembre.Ranking;
                    newLdfCategory.rankingIndex=afttMembre.RankingIndex;
                    ldfCategory=await this.interclubsRepositoryService.InterclubsLdfByCategoryEntity(newLdfCategory);
                }
            }
        }

        return response;
    }
}
