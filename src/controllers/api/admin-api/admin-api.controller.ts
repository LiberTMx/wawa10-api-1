import { Controller, Get, Post, Request, Logger, BadRequestException } from '@nestjs/common';
import { SoapService } from '../../../modules/soap/services/soap.service';
import { AfttAllDataEntity } from '../../../modules/repository/aftt/entities/aftt-all-data.entity';
import { AdminService } from '../../../modules/admin/services/admin/admin.service';

import * as DateFNS from 'date-fns';
import * as log4js from 'log4js';
import { AfttTeamEntity } from '../../../modules/repository/aftt/entities/aftt-team.entity';
import { AfttDivisionEntity } from '../../../modules/repository/aftt/entities/aftt-division.entity';
import { AfttMatchEntity } from '../../../modules/repository/aftt/entities/aftt-match.entity';
import { AfttDivisionCategoryEntity } from '../../../modules/repository/aftt/entities/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from '../../../modules/repository/aftt/entities/aftt-member-by-category.entity';
import { ResponseMessage } from '../../../shared/dto/response-message.dto';
import { WeekInfo } from '../../../shared/week.info';
import { be } from 'date-fns/locale';
import { AfttWeekByCategory } from '../../../modules/repository/aftt/entities/aftt-week-by-category.entity';
import { ParametreService } from '../../../modules/parametre/services/parametre.service';
import { ParametreType } from '../../../modules/parametre/enum/parametre.enum';
import { AfttMatchTypeEntity } from '../../../modules/repository/aftt/entities/aftt-match-type.entity';
const logger = log4js.getLogger('AdminApiController');

@Controller('admin')
export class AdminApiController 
{
    constructor(
        private readonly adminService: AdminService,
        private readonly soapService: SoapService,
        private readonly parametreService: ParametreService,
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
    async getAllFromAftt(@Request() req): Promise<ResponseMessage>
    {
      let teams: string = await this.soapService.getTeamList();
      if(teams===null || teams===undefined)
      {
        logger.error('Unable to read teams data !');
        throw new BadRequestException('Unable to read teams data !');
      }
      teams=JSON.stringify(teams);
      
      let divisions = await this.soapService.getDivisionList();
      if(divisions===null || divisions===undefined)
      {
        logger.error('Unable to read divisions data !');
        throw new BadRequestException('Unable to read divisions data !');
      }
      divisions=JSON.stringify(divisions);
      //logger.debug('divisions:', divisions);

      let matches = await this.soapService.getMatches();
      if(matches===null || matches===undefined)
      {
        logger.error('Unable to read matches data !');
        throw new BadRequestException('Unable to read matches data !');
      }
      matches=JSON.stringify(matches);
      //logger.debug('matches:', matches);
      const categories: AfttDivisionCategoryEntity[]=await this.adminService.getDivisionCategoryList();

      const membresArray /*: [{data: any, category: number}]*/=[];

      for( const cat of categories)
      {
        const data = await this.soapService.getMembres(cat.playercategory);
        membresArray.push( {data, category: cat.playercategory} );
      }
 
      const membres=JSON.stringify(membresArray);
      //logger.debug('membres:', membres);

      logger.debug('teams length:'+teams.length);
      logger.debug('divisions length:'+divisions.length);
      logger.debug('matches length:'+matches.length);
      logger.debug('membres length:'+membres.length);

      logger.debug('persisting last sync data...');
      const afttData: AfttAllDataEntity=await this.adminService.createAfttAllData(teams, divisions, matches, membres);

      logger.debug('Last sync data persisted!', afttData.id);
      return new ResponseMessage('ok', '200');
    }

    @Get('lastAfttSync')
    async getLastAfttSync(): Promise<AfttAllDataEntity>
    {
      return await this.adminService.getLastAfttSync();
    }

    @Get('lastAfttSyncId')
    async getLastAfttSyncId(): Promise<AfttAllDataEntity>
    {
      try
      {
        const lastSyncId =  await this.adminService.getLastAfttSyncId();
        logger.debug('lastSync ID:', lastSyncId);
        return lastSyncId;
      }
      catch(err)
      {
        throw new BadRequestException(err.message);
      }
    }

    @Get('divisionCategories')
    async getDivisionCategories(): Promise<AfttDivisionCategoryEntity[]>
    {
      const categories: AfttDivisionCategoryEntity[]=await this.adminService.getDivisionCategoryList();
      return categories;
    }

    @Get('processLastSync')
    async processLastSync(): Promise<ResponseMessage>
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
      const clubName: string = this.processTeams(lastSync.id, teamsData);

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

      await this.buildAfttWeeks();

      const teamNamePrefix = await this.parametreService.findParametreByKey(ParametreType.aftt_team_name_prefix);
      const clubIndice = await this.parametreService.findParametreByKey(ParametreType.club_indice);

      await this.adminService.updateTeamsInMatchesForSync(lastSync.id, clubName, teamNamePrefix.paramValue, clubIndice.paramValue);

      return new ResponseMessage('ok', '200');
    }

    processTeams(lastSyncId: number, teamsData: any): string
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

      return clubName;
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

    @Get('afttWeeks/:syncId')
    async getAfttWeeks(@Request() req): Promise<AfttWeekByCategory[]>
    {
      const syncId = req.params.syncId;
      return this.adminService.getAfttWeeks(syncId);
    }

    @Get('afttMatches/:syncId')
    async getAfttMatches(@Request() req): Promise<AfttMatchEntity[]>
    {
      const syncId = req.params.syncId;
      return this.adminService.getAfttMatches(syncId);
    }

    @Get('buildWeeks')
    async buildWeeks(@Request() req): Promise<ResponseMessage>
    {
      return new ResponseMessage('ok', '200');
    }

    async buildAfttWeeks()
    {
      const lastSyncIdInfo: AfttAllDataEntity =  await this.adminService.getLastAfttSyncId();
      const syncId: number = lastSyncIdInfo.id;

      const matches: AfttMatchEntity[] = await this.adminService.getAfttMatches(syncId);
      await this.adminService.deleteAllWeeks(syncId);

      /*
      let isInError: boolean=false;

      if(matches!==null && matches!==undefined && matches.length>0)
      {
        const weekMap = new Map<string,number>();
        for(const match of matches)
        {
          if(match.matchDate===null || match.matchDate===undefined) continue;

          // const date: Date = DateFNS.parse(match.matchDate);
          const afttWeekName=match.WeekName;
          const r = weekMap.get(afttWeekName);
          const weekNumber=DateFNS.getWeek(match.matchDate);
          //logger.debug('Week of date '+match.matchDate+' is: '+weekNumber);

          if(r===null || r===undefined)
          {
            weekMap.set(afttWeekName, weekNumber);
          }
          else
          {
            if(r!==weekNumber)
            {
              logger.error('weekname '+afttWeekName+' is associated to more then one weekNumber: '+r+' and '+weekNumber);
              isInError=true;
            }
          }
        }

        logger.info('Weeks evaluation done - is in error ?'+isInError);
      }
      */

      //if( isInError === true )
      {
        let isInError: boolean=false;
        logger.info('Checking weeks can be built by category...');

        // Faut faire le meme exercice mais par categorie
        const categories: AfttDivisionCategoryEntity[] = await this.adminService.getDivisionCategoryList();
        let division: AfttDivisionEntity=null;
        let divisionId=null;
        for(const cat of categories)
        {
          isInError = false;
          let weekMap=null;
          let weekInfo=null;
          const matchesByCat = matches.filter( m => (+m.DivisionCategory) === (+cat.playercategory) );
          if(matchesByCat!==null && matchesByCat!==undefined && matchesByCat.length > 0)
          {
            weekMap = new Map<string,WeekInfo>();
            for(const match of matchesByCat)
            {
              if(match.matchDate===null || match.matchDate===undefined) continue;
              if(match.DivisionId !== divisionId)
              {
                division = await this.adminService.findDivisionById(match.DivisionId);
                divisionId=match.DivisionId;
                if(division.MatchType === 5 ) continue;
              }

              // const date: Date = DateFNS.parse(match.matchDate);
              const afttWeekName=match.WeekName;
              const r: WeekInfo = weekMap.get(afttWeekName);
              const weekNumber=DateFNS.getWeek(match.matchDate, {weekStartsOn: 1, locale: be});
              const year=DateFNS.getYear(match.matchDate);
              let dayOfWeek: number = DateFNS.getDay(match.matchDate);
              if(dayOfWeek===0) dayOfWeek=7;

              let startOfWeek=DateFNS.startOfWeek(match.matchDate, {weekStartsOn: 1, locale: be});
              let endOfWeek=DateFNS.endOfWeek(match.matchDate, {weekStartsOn: 1, locale: be});

              /*
              [2020-04-06T12:45:40.619] [DEBUG] AdminApiController - 
              match date:Fri Nov 22 2019 00:00:00 GMT+0100 (GMT+01:00), 
              week:47, 
              week day:5, 
              start week:Mon Nov 18 2019 00:00:00 GMT+0100 (GMT+01:00), 
              end week:Sun Nov 24 2019 00:00:00 GMT+0100 (GMT+01:00)

              [2020-04-06T12:45:40.802] [DEBUG] AdminApiController - 
              match date:Sun Feb 16 2020 00:00:00 GMT+0100 (GMT+01:00), 
              week:7, 
              week day:7, 
              start week:Mon Feb 10 2020 00:00:00 GMT+0100 (GMT+01:00), 
              end week:Sun Feb 16 2020 00:00:00 GMT+0100 (GMT+01:00)

              */
              const oneDayMillisec = 1000 * 24 * 60 * 60;
              startOfWeek = new Date( match.matchDate.getTime() - (dayOfWeek-1) * oneDayMillisec);
              endOfWeek = new Date( match.matchDate.getTime() + (7 - dayOfWeek)  * oneDayMillisec );
              //logger.debug('Week of date '+match.matchDate+' is: '+weekNumber);

              logger.debug('match date:'+match.matchDate+', week:'+weekNumber+', week day:'+dayOfWeek
                                                    +', start week:'+startOfWeek+', end week:'+endOfWeek);

              if(r===null || r===undefined)
              {
                weekInfo = new WeekInfo(
                  /*public weebName: string,*/    afttWeekName,
                  /*public weekNumber: number,*/  weekNumber,
                  /*public year: number,*/        year,
                  /*public startOfWeek: Date,*/   startOfWeek,
                  /*public endOfWeek: Date,*/     endOfWeek,
                );
                weekMap.set(afttWeekName, /*weekNumber + 1000 * year*/ weekInfo);
              }
              else
              {
                if( r.year !== year && r.weekNumber !== weekNumber)
                {
                  logger.error('weekname '+afttWeekName+' is associated to more then one weekNumber: '+r+' and '+weekNumber, match);
                  isInError=true;
                }
              }
            }

            logger.info('Weeks evaluation done for category '+cat.name+' - is in error ?'+isInError);
          }

          if (! isInError )
          {
            await this.prepareWeeksFromCategoryAndMap(cat, weekMap, syncId);
          }
          
        }

      }
    }

    async prepareWeeksFromCategoryAndMap(category: AfttDivisionCategoryEntity, weekMap: Map<string,WeekInfo>, syncId: number)
    {
      //logger.debug('create week for category', category);
      //logger.debug('week map', weekMap);

      for (const key of weekMap.keys()) {
        const weekInfo: WeekInfo=weekMap.get(key);
        //logger.debug('key:'+key+', WeekInfo:', weekInfo);
        await this.adminService.createAfttWeek(syncId, category, weekInfo);
      }
    }

    @Get('importSemainesFromAfttToClub')
    async importSemainesFromAfttToClub(): Promise<ResponseMessage>
    {
      logger.warn('Still NOT implemented!');
      return new ResponseMessage('ok', '200');
    }

    @Get('importInterclubsCategoriesFromAfttToClub')
    async importInterclubsCategoriesFromAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsCategoriesFromAfttToClub();
    }

    @Get('importInterclubsSemainesAfttToClub')
    async importInterclubsSemainesAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsSemainesFromAfttToClub();
    }

    @Get('matchTypes')
    async getMatchTypes(): Promise< AfttMatchTypeEntity[] >
    {
        return await this.adminService.getMatchTypes();
    }

    @Get('importInterclubsDivisionsFromAfttToClub')
    async importInterclubsDivisionsFromAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsDivisionsFromAfttToClub();
    }

    @Get('importInterclubsTeamsFromAfttToClub')
    async importInterclubsTeamsFromAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsTeamsFromAfttToClub();
    }

    @Get('importInterclubsMatchesFromAfttToClub')
    async importInterclubsMatchesFromAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsMatchesFromAfttToClub();
    }

    @Get('importInterclubsAllLDFFromAfttToClub')
    async importInterclubsAllLDFFromAfttToClub(): Promise<ResponseMessage>
    {
      return await this.adminService.importInterclubsAllLDFFromAfttToClub();
    }
}
