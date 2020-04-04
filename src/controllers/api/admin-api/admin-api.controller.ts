import { Controller, Get, Post, Request, Logger, BadRequestException } from '@nestjs/common';
import { SoapService } from '../../../modules/soap/services/soap.service';
import { AfttAllDataEntity } from '../../../modules/repository/aftt/entities/aftt-all-data.entity';
import { AdminService } from '../../../modules/admin/services/admin/admin.service';

import * as log4js from 'log4js';
import { AfttTeamEntity } from '../../../modules/repository/aftt/entities/aftt-team.entity';
import { AfttDivisionEntity } from '../../../modules/repository/aftt/entities/aftt-division.entity';
import { AfttMatchEntity } from '../../../modules/repository/aftt/entities/aftt-match.entity';
import { AfttDivisionCategoryEntity } from '../../../modules/repository/aftt/entities/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from '../../../modules/repository/aftt/entities/aftt-member-by-category.entity';
const logger = log4js.getLogger('AdminApiController');

@Controller('admin')
export class AdminApiController 
{
    constructor(
        private readonly adminService: AdminService,
        private readonly soapService: SoapService,
      ) 
    {}

    @Get('teamList')
    async teamList(@Request() req): Promise<any> 
    {
      return await this.soapService.getTeamList();
    }

    @Get('divisionList')
    async divisionList(@Request() req): Promise<any> 
    {
      return await this.soapService.getDivisionList();
    }

    @Get('matches')
    async matches(@Request() req): Promise<any> 
    {
      return await this.soapService.getMatches();
    }
    
    @Get('membres')
    async membres(@Request() req): Promise<any> 
    {
      return await this.soapService.getMembres();
    }

    @Get('allFromAftt')
    async getAllFromAftt(@Request() req): Promise<AfttAllDataEntity>
    {
      let teams: string = await this.soapService.getTeamList();
      if(teams===null || teams===undefined)
      {
        logger.error('Unable to read teams data !');
        throw new BadRequestException('Unable to read teams data !');
      }
      teams=JSON.stringify(teams);
      
      let divisions = await this.soapService.getDivisionList();
      divisions=JSON.stringify(divisions);
      //logger.debug('divisions:', divisions);

      let matches = await this.soapService.getMatches();
      matches=JSON.stringify(matches);
      //logger.debug('matches:', matches);
      const categories: AfttDivisionCategoryEntity[]=await this.adminService.getDivisionCategoryList();

      const membresArray /*: [{data: any, category: number}]*/=[];

      for( const cat of categories)
      {
        const data = await this.soapService.getMembres(cat.playercategory);
        membresArray.push( {data, category: cat.playercategory} );
      }
      /*
      const messieurs = await this.soapService.getMembres(1);
      const dames = await this.soapService.getMembres(2);
      const veterans = await this.soapService.getMembres(3);
      const ainees = await this.soapService.getMembres(4);
      const jeunes = await this.soapService.getMembres(13);
      */
      /*
      const membresArray=[ 
        {messieurs, category: 1}, 
        {dames, category: 2}, 
        {veterans, category: 3}, 
        {ainees, category: 4}, 
        {jeunes, category: 13},
      ];*/
      const membres=JSON.stringify(membresArray);
      //logger.debug('membres:', membres);

      logger.debug('teams length:'+teams.length);
      logger.debug('divisions length:'+divisions.length);
      logger.debug('matches length:'+matches.length);
      logger.debug('membres length:'+membres.length);

      return await this.adminService.createAfttAllData(teams, divisions, matches, membres);
    }

    @Get('lastAfttSync')
    async getLastAfttSync(): Promise<AfttAllDataEntity>
    {
      return await this.adminService.getLastAfttSync();
    }

    @Get('lastAfttSyncId')
    async getLastAfttSyncId(): Promise<AfttAllDataEntity>
    {
      const lastSyncId =  await this.adminService.getLastAfttSyncId();
      logger.debug('lastSync ID:', lastSyncId);
      return lastSyncId;
    }

    @Get('divisionCategories')
    async getDivisionCategories(): Promise<AfttDivisionCategoryEntity[]>
    {
      const categories: AfttDivisionCategoryEntity[]=await this.adminService.getDivisionCategoryList();
      return categories;
    }

    @Get('processLastSync')
    async processLastSync(): Promise<any>
    {
      const lastSync=await this.adminService.getLastAfttSync();
      if(lastSync===null || lastSync===undefined) return null;

      //const teamsAsJson=JSON.parse(lastSync);
      logger.debug('lastSync ID:', lastSync.id);

      await this.adminService.removeAllAfttDataForSync(lastSync.id);

      // Les equipes
      const teams=lastSync.teams;
      const teamsAsJson=JSON.parse(teams);
      const teamsData=teamsAsJson.data;
      this.processTeams(lastSync.id, teamsData);

      // Les divisions
      const divisionsAsJson=JSON.parse(lastSync.divisions);
      this.processDivisions(lastSync.id, teamsData, divisionsAsJson.data);
     
      // Les matches
      const matchesAsJson=JSON.parse(lastSync.matches);
      this.processMatches(lastSync.id, matchesAsJson.data);

      // Les membres par categories/listes des forces
      const allMembresAsJson=JSON.parse(lastSync.membres);
      if( Array.isArray(allMembresAsJson) === true)
      {
        // : [{data: any, category: number}]
        for(const ma of allMembresAsJson)
        {
          const category=ma.category;
          logger.debug('membre category to be processed:', category);
          this.processCategoryMembres(lastSync.id, ma);
        }
      }

      return 'ok';
    }

    processTeams(lastSyncId: number, teamsData: any)
    {

      /*
  
      [2020-04-03T01:44:57.578] [DEBUG] AdminApiController - teams data: {
          ClubName: 'CTT Limal Wavre',
          TeamCount: 41,
          TeamEntries: [
            {
              TeamId: '4597-8',
              Team: '',
              DivisionId: 4597,
              DivisionName: 'Beker van Belg vr 2 - National - Hommes',
              DivisionCategory: 1,
              MatchType: 5
            },
            {
              TeamId: '4141-9',
              Team: 'A',
              DivisionId: 4141,
              DivisionName: 'Division 1A - National - Hommes',
              DivisionCategory: 1,
              MatchType: 2
            },
  
      */

      const clubName=teamsData.ClubName;
      logger.debug('clubName ', clubName);

      const teamCount=teamsData.TeamCount;
      logger.debug('teamCount ', teamCount);

      const entries=teamsData.TeamEntries;
      if( Array.isArray(entries) && entries!==null && entries !== undefined && entries.length > 0)
      {
        for( const entry of entries)
        {
          //logger.debug('team ', entry);
          const team=new AfttTeamEntity();
          Object.assign(team, entry);
          team.aftt_LastSyncId=lastSyncId;

          this.adminService.saveAfttTeam(team);
        }
      }

    }

    processDivisions(lastSyncId: number, teams: any, divisions: any)
    {
      //logger.debug('divisions ', divisions);
      /*
      divisions  {"data":{
        "DivisionCount":516,
        "DivisionEntries":
        [
          {
            "DivisionId":4256,
            "DivisionName":"SUPER HEREN - Super Division - Hommes",
            "DivisionCategory":1,
            "Level":6,
            "MatchType":8},
            {"DivisionId":4141,"DivisionName":"Division 1A - National - Hommes","DivisionCategory":1,"Level":1,"MatchType":2},

      */

      const teamEntries=teams.TeamEntries;

      const divisionCount=divisions.DivisionCount;
      logger.debug('divisionCount ', divisionCount);

      let linkedDivisionCount=0;
      const entries=divisions.DivisionEntries;
      if( Array.isArray(entries) && entries!==null && entries !== undefined && entries.length > 0)
      {
        for( const entry of entries)
        {
          const team = teamEntries.find( t => t.DivisionId === entry.DivisionId );
          if(team!==null && team!==undefined)
          {
            const division=new AfttDivisionEntity();
            Object.assign(division, entry);
            division.aftt_LastSyncId=lastSyncId;

            this.adminService.saveAfttDivision(division);
            linkedDivisionCount++;
          }
          /*
          //logger.debug('team ', entry);
          const team=new AfttTeamEntity();
          Object.assign(team, entry);
          team.aftt_LastSyncId=lastSyncId;

          this.adminService.saveAfttDivision(team);
          */
        }
      }
      logger.debug('linkedDivisionCount ', linkedDivisionCount);

    }

    processMatches(lastSyncId: number, matches: any)
    {
      const matchCount=matches.MatchCount;
      logger.debug('matchCount ', matchCount);

      const entries=matches.TeamMatchesEntries;
      if( Array.isArray(entries) && entries!==null && entries !== undefined && entries.length > 0)
      {
        for( const entry of entries)
        {
            const match=new AfttMatchEntity();
            Object.assign(match, entry);
            match.aftt_LastSyncId=lastSyncId;

            // "Date":"2019-11-17T00:00:00.000Z"
            let d: string = entry.Date;
            if(d!==null && d!==undefined)
            {
              if(d.endsWith('T00:00:00.000Z'))
              {
                const p = d.indexOf('T00:00:00.000Z');
                d = d.substr(0, p);
              }
              // logger.debug('constructing match date based on string:', d);
              match.matchDate = new Date(d);
            }
            else
            {
              // La date d'un match n'existe pas pour un BYE !
              // logger.warn('Match date NOT parsed (null!) for match', match);
              match.matchDate=null;
            }

            // Venue
            /*
            "VenueEntry":{"Name":"SALLE COMMUNALE DE LA VERTE CHASSE","Street":"RUE DE LA VERTE CHASSE",
              "Town":"7600 PERUWELZ","Phone":"32499520930","Comment":""}
            */
            const venue: {Name: string, Street: string, Town: string, Phone: string, Comment: string}=entry.VenueEntry;
            if(venue!==null && venue!==undefined)
            {
              match.venueName=venue.Name;
              match.venueStreet=venue.Street;
              match.venueTown=venue.Town;
              match.venuePhone=venue.Phone;
              match.venueComment=venue.Comment;
            }
            //logger.debug('persisting match', match);
            if(match.MatchUniqueId===null || match.MatchUniqueId===undefined)
            {
              //throw new BadRequestException('match without unique ID found !' + match);
              match.MatchUniqueId = null;
            }
            this.adminService.saveAfttMatch(match);

        }
      }
    }

    processCategoryMembres( lastSyncId: number, ma: {data: any, category: number})
    {

      const dd = ma.data;

      const dda = dd.data;
      const err = dd.err;

      const memberCount = dda.MemberCount;
      logger.debug('Category '+ ma.category+' contains '+ memberCount+' members');

      /*
      "MemberCount":152,
      "MemberEntries":
      [
        {"Position":1,"UniqueIndex":119894,"RankingIndex":1,
          "FirstName":"JULIEN","LastName":"INDEHERBERG","Ranking":"A20","Status":"A","Gender":"M",
          "Category":"SEN","MedicalAttestation":true},
        {"Position":2,"UniqueIndex":164914,"RankingIndex":6,"FirstName":"ROMAIN","LastName":"BARRAGUE","Ranking":"B2","Status":"A","Gender":"M","Category":"J21","MedicalAttestation":true},
        
      */

      const entries=dda.MemberEntries;
      if( Array.isArray(entries) && entries!==null && entries !== undefined && entries.length > 0)
      {
        for( const entry of entries)
        {
            const membre=new AfttMemberByCategoryEntity();
            Object.assign(membre, entry);
            membre.aftt_LastSyncId=lastSyncId;
            membre.divisionCategory=ma.category;
            this.adminService.saveAfttMemberByCategory(membre);

        }
      }
    }

    @Get('afttDivisions/:syncId')
    async getAfttDivisions(@Request() req): Promise<AfttDivisionEntity[]>
    {
      const syncId = req.params.syncId;
      return this.adminService.getAfttDivisions(syncId);
    }

    @Get('afttDivisionCategories')
    async getAfttDivisionCategories(@Request() req): Promise<AfttDivisionCategoryEntity[]>
    {
      return this.adminService.getDivisionCategoryList();
    }

    @Get('afttTeams/:syncId')
    async getAfttTeams(@Request() req): Promise<AfttTeamEntity[]>
    {
      const syncId = req.params.syncId;
      return this.adminService.getAfttTeams(syncId);
    }

    @Get('afttMembers/:syncId')
    async getAfttMembers(@Request() req): Promise<AfttMemberByCategoryEntity[]>
    {
      const syncId = req.params.syncId;
      return this.adminService.getAfttMembers(syncId);
    }
}
