import { Controller, Get, Request, Post, Body, Headers, BadRequestException, Query } from '@nestjs/common';
import { InterclubsDivisionEntity } from '../../../modules/repository/interclubs/entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../../../modules/repository/interclubs/entities/interclubs-team.entity';
import { InterclubsMatchEntity } from '../../../modules/repository/interclubs/entities/interclubs-match.entity';
import { InterclubsLdfParticipantEntity } from '../../../modules/repository/interclubs/entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from '../../../modules/repository/interclubs/entities/interclubs-ldf-by-category.entity';
import { InterclubsService } from '../../../modules/interclubs/services/interclubs.service';
import { InterclubsSemaineEntity } from '../../../modules/repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from '../../../modules/repository/interclubs/entities/interclubs-category.entity';
import { InterclubsSemaineVersionEntity } from '../../../modules/repository/interclubs/entities/interclubs-semaine-version.entity';
import * as log4js from 'log4js';
import { LdfParticipantDTO } from '../../../shared/dto/interclubs/ldf-participant.dto';
import { InterclubsSelectionEntity } from '../../../modules/repository/interclubs/entities/interclubs-selection.entity';
import { InterclubsEnrichedSelectionModel } from '../../../modules/interclubs/model/interclubs-enriched-selection.model';
import { DeleteSelectionDTO } from '../../../shared/dto/interclubs/delete-selection.dto';
import { ResponseMessage } from '../../../shared/dto/response-message.dto';
import { PublishSelectionDTO } from '../../../shared/dto/interclubs/publish-selection.dto';
import { AuthUserEntity } from '../../../modules/repository/user/entities/auth-user.entity';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { CreateSelectionDTO } from '../../../shared/dto/interclubs/create-selection.dto';
import { ValidateSelectionDTO } from '../../../shared/dto/interclubs/validate-selection.dto';
const logger = log4js.getLogger('InterclubsApiController');

@Controller('interclubs')
export class InterclubsApiController {

    constructor(
        private readonly authService: AuthService,
        private readonly interclubsService: InterclubsService,
        ) {}
        
    // http://localhost:3000/api/interclubs/listeSemainesInterclubs/dames
    @Get('listeInterclubsSemaines/:type')
    async getInterclubsSemaineByInterclubType(@Request() req): Promise< InterclubsSemaineEntity[] >
    {
        const interclubType= req.params.type;
        return this.interclubsService.getInterclubsSemaineByInterclubType(interclubType);
    }

    // http://localhost:3000/api/interclubs/listeInterclubsCategories
    @Get('listeInterclubsCategories')
    async getInterclubsCategories(@Request() req): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsService.getInterclubsCategories();
    }

    // http://localhost:3000/api/interclubs/listeInterclubsDivisions
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

    @Get('publishedInterclubsSemaines')
    async getPublishedInterclubsSemaines(@Request() req): Promise< InterclubsSemaineVersionEntity[] >
    {
        return await this.interclubsService.getPublishedInterclubsSemaines();
    }

    // const apiUrl=`${environment.apiUrl}/interclubs/semaineVersions/${semaine.id}`;
    @Get('semaineVersions/:semaineId')
    async getSemaineVersions(@Request() req): Promise< InterclubsSemaineVersionEntity[] >
    {
        const semaineId = req.params.semaineId;
        return await this.interclubsService.getSemaineVersions(semaineId);
    }

    @Post('createSelection')
    async storeSelection(@Request() req, @Body() createSelectionDTO: CreateSelectionDTO, @Headers() headers): Promise<InterclubsSelectionEntity>
    {
       /*  
          create selection CreateSelectionDTO {
            selection: '{"participant":{"id":1,"nom":"INDEHERBERG","prenom":"JULIEN","sexe":"M","licence":"119894",
            "authUserId":null,"statut":"A","playerCategory":"1","medicalAttestation":true},"listeDeForce":{"id":1,"participantId":1,
            "playerCategory":1,"position":1,"classement":"A20","rankingIndex":1}}',
            match: `{"id":92,"MatchId":"NH01/025","WeekName":"01","matchDate":"2019-09-13T22:00:00.000Z","Time":"19:00:00",
            "Venue":1,"HomeClub":"BBW165","HomeTeam":"Logis Auderghem A","AwayClub":"BBW123","AwayTeam":"Limal Wavre A",
            "Score":"9-7","MatchUniqueId":387499,"IsHomeForfeited":false,"IsAwayForfeited":false,"DivisionId":4141,
            "DivisionCategory":"1","IsHomeWithdrawn":"N","IsAwayWithdrawn":"N","venueName":"CENTRE SPORTIF D'AUDERGHEM",
            "venueStreet":"CHAUSSEE DE WAVRE 1690","venueTown":"1160 BRUXELLES","venuePhone":"02/672.24.21","venueComment":"",
            "IsValidated":true,"IsLocked":true,"homeTeamId":null,"awayTeamId":"4141-9"}`,
            position: '1'
        }
        */

        //verifier si l'utilisateur à les droits pour selectionner
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        createSelectionDTO.match = JSON.parse(createSelectionDTO.match);
        createSelectionDTO.selection = JSON.parse(createSelectionDTO.selection);
        createSelectionDTO.version = JSON.parse(createSelectionDTO.version);
        logger.debug('create selection', createSelectionDTO);
        return await this.interclubsService.storeSelection(createSelectionDTO, connectedUser);
        // return new ResponseMessage('ok', '200');
    }

    // selectionForMatch ? matchId & versionId
    @Get('selectionForMatch')
    async getSelectionForMatch(@Request() req, @Query() query): Promise<InterclubsSelectionEntity[]>
    {
        const matchId = query.matchId;
        const versionId = query.versionId;
        return await this.interclubsService.getSelectionForMatch(matchId, versionId);
    }

    // enrichedSelectionForMatch
    @Get('enrichedSelectionForMatch')
    async getEnrichedSelectionForMatch(@Request() req, @Query() query): Promise<InterclubsEnrichedSelectionModel[]>
    {
        const matchId = query.matchId;
        const versionId = query.versionId;
        return await this.interclubsService.getEnrichedSelectionForMatch(matchId, versionId);
    }

    @Post('deleteSelection')
    async deleteSelection(@Request() req, @Body() deleteSelectionDTO: DeleteSelectionDTO, @Headers() headers): Promise<ResponseMessage>
    {
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        deleteSelectionDTO.match = JSON.parse(deleteSelectionDTO.match);
        deleteSelectionDTO.version = JSON.parse(deleteSelectionDTO.version);
        logger.debug('create selection', deleteSelectionDTO);
        await this.interclubsService.deleteSelection(deleteSelectionDTO, connectedUser);
        return new ResponseMessage('ok', '200');
    }

    @Post('publishSemaineVersion')
    async publishSemaineVersion(@Request() req, @Body() publishSelectionDTO: PublishSelectionDTO, @Headers() headers): Promise< InterclubsSemaineVersionEntity >
    {
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        publishSelectionDTO.version = JSON.parse(publishSelectionDTO.version);
        logger.debug('publish selection for version', publishSelectionDTO);
        return await this.interclubsService.publishSemaineVersion(publishSelectionDTO, connectedUser);
    }

    @Post('updateLdfParticipant')
    async updateLdfParticipant(@Request() req, @Body() participant: LdfParticipantDTO, @Headers() headers): Promise< InterclubsLdfParticipantEntity >
    {
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        logger.debug('updateLdfParticipant', participant);

        participant=JSON.parse(participant.participant);
        if(participant===null || participant===undefined) return null;

        return await this.interclubsService.updateLdfParticipant(participant, connectedUser);

    }

    // validateSelection
    @Post('validateSelection')
    async validateSelection(@Request() req, @Body() validateSelectionDTO: ValidateSelectionDTO, @Headers() headers): Promise< any >
    {
        /*
            selectionId: String(selection.sel.id),
            statut: formValue.statut,
            commentaire: formValue.comentaire
        */
        const connectedUser: AuthUserEntity = await this.authService.identifyUser(headers.authorization);
        const isUserClubAdmin=this.authService.verifyUserIsClubAdmain(connectedUser);
        if (connectedUser === null || ! isUserClubAdmin) {
            throw new BadRequestException('Unauthorized access');
        }

        logger.debug('validateSelection', validateSelectionDTO);

/*         participant=JSON.parse(participant.participant);
        if(participant===null || participant===undefined) return null; */

        return await this.interclubsService.validateSelection(validateSelectionDTO, connectedUser);
        //return 'ok';

    }

}
