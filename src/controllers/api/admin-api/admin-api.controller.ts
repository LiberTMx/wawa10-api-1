import { Controller, Get, Post, Request, Logger, BadRequestException } from '@nestjs/common';
import { SoapService } from '../../../modules/soap/services/soap.service';
import { AfttAllDataEntity } from '../../../modules/repository/aftt/entities/aftt-all-data.entity';
import { AdminService } from '../../../modules/admin/services/admin/admin.service';

import * as log4js from 'log4js';
import { AfttTeamEntity } from '../../../modules/repository/aftt/entities/aftt-team.entity';
import { AfttDivisionEntity } from '../../../modules/repository/aftt/entities/aftt-division.entity';
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
      const messieurs = await this.soapService.getMembres(1);
      const dames = await this.soapService.getMembres(2);
      const veterans = await this.soapService.getMembres(3);
      const ainees = await this.soapService.getMembres(4);
      const jeunes = await this.soapService.getMembres(13);
      const membresArray=[ 
        {messieurs, category: 1}, 
        {dames, category: 2}, 
        {veterans, category: 3}, 
        {ainees, category: 4}, 
        {jeunes, category: 13},
      ];
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

    @Get('processLastSync')
    async processLastSync(): Promise<any>
    {
      const lastSync=await this.adminService.getLastAfttSync();
      if(lastSync===null || lastSync===undefined) return null;

      //const teamsAsJson=JSON.parse(lastSync);
      logger.debug('lastSync ID:', lastSync.id);

      await this.adminService.removeAllAfttDataForSync(lastSync.id);

      //const ll=lastSync.teams_data
      const teams=lastSync.teams;
      //logger.debug('teams:', teams);
      const teamsAsJson=JSON.parse(teams);
      const teamsData=teamsAsJson.data;

      //logger.debug('teams data:', teamsData);

      this.processTeams(lastSync.id, teamsData);

      const divisionsAsJson=JSON.parse(lastSync.divisions);
      this.processDivisions(lastSync.id, teamsData, divisionsAsJson.data);
     
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

}
