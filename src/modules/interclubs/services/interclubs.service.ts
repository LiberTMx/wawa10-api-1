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
import { CreateSelectionDTO } from 'src/shared/dto/interclubs/create-selection.dto';
import { InterclubsSelectionEntity } from 'src/modules/repository/interclubs/entities/interclubs-selection.entity';
import { AuthUserEntity } from 'src/modules/repository/user/entities/auth-user.entity';
import { DeleteSelectionDTO } from 'src/shared/dto/interclubs/delete-selection.dto';
import { PublishSelectionDTO } from 'src/shared/dto/interclubs/publish-selection.dto';
import { LdfParticipantDTO } from '../../../shared/dto/interclubs/ldf-participant.dto';
import { AuthService } from '../../auth/services/auth/auth.service';
import { InterclubsEnrichedSelectionModel } from '../model/interclubs-enriched-selection.model';
const logger = log4js.getLogger('InterclubsService');

@Injectable()
export class InterclubsService 
{
    constructor(
        private readonly authService: AuthService,
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
        const matches = await this.interclubsRepositoryService.getInterclubsMatches();
        if(matches!==null && matches!==undefined && matches.length>0)
        {
            for(const m of matches)
            {
                const division = await this.interclubsRepositoryService.getInterclubsDivisionByDivisionId(m.DivisionId);
                m.division = division;
            }
        }
        return matches;
    }

    async getInterclubsLDFParticipants(): Promise< InterclubsLdfParticipantEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsLDFParticipants();
    }

    async getInterclubsLDFByCategory(): Promise< InterclubsLdfByCategoryEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsLDFByCategory();
    }

    async getSemaineNextVersion(semaineId: number): Promise< InterclubsSemaineVersionEntity[] >
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
                await this.interclubsRepositoryService.saveSemaineVersion(newSemaineVersion);
                return this.getSemaineVersions(semaineId);
            }
            else
            {
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
                return this.getSemaineVersions(semaineId);
            }
        }

        return null;
    }   
    
    async getPublishedInterclubsSemaines(): Promise< InterclubsSemaineVersionEntity[] >
    {
        return this.interclubsRepositoryService.getPublishedInterclubsSemaines();
    }

    async getSemaineVersions(semaineId: number): Promise< InterclubsSemaineVersionEntity[]>
    {
        return this.interclubsRepositoryService.getSemaineVersions(semaineId);
    }

    async storeSelection(createSelectionDTO: CreateSelectionDTO, connectedUser: AuthUserEntity): Promise<InterclubsSelectionEntity>
    {
        //find any existing entity at same position
        const existingSelection =  await this.interclubsRepositoryService.findSelection(
            createSelectionDTO.match.MatchId,
            createSelectionDTO.version.id,
            createSelectionDTO.position,
        );
        if(existingSelection!==null && existingSelection!==undefined)
        {
            existingSelection.auth_user_id = createSelectionDTO.selection.participant.authUserId;
            existingSelection.classement = createSelectionDTO.selection.listeDeForce.classement;
            existingSelection.ranking_index = createSelectionDTO.selection.listeDeForce.rankingIndex;
            existingSelection.joueur_confirmation = '';
            existingSelection.joueur_commentaire = '';
            existingSelection.updated_at = new Date();
            existingSelection.updated_by = connectedUser.id;
            return this.interclubsRepositoryService.storeSelection(existingSelection);
        }

        const selection: InterclubsSelectionEntity = new InterclubsSelectionEntity();

        selection.interclubs_match_id = createSelectionDTO.match.MatchId;
        selection.auth_user_id = createSelectionDTO.selection.participant.authUserId;
        selection.interclubs_semaine_version_id = createSelectionDTO.version.id;
        selection.position = createSelectionDTO.position;
        selection.classement = createSelectionDTO.selection.listeDeForce.classement;
        selection.ranking_index = createSelectionDTO.selection.listeDeForce.rankingIndex;
        selection.joueur_confirmation = '';
        selection.joueur_commentaire = '';
        selection.updated_at = new Date();
        selection.updated_by = connectedUser.id;

        return this.interclubsRepositoryService.storeSelection(selection);
    }

    async getSelectionForMatch(matchId: string, versionId: number): Promise< InterclubsSelectionEntity[]>
    {
        return this.interclubsRepositoryService.getSelectionForMatch(matchId,versionId);
    }

    async getEnrichedSelectionForMatch(matchId: string, versionId: number): Promise< InterclubsEnrichedSelectionModel[]>
    {
        const array: InterclubsEnrichedSelectionModel[] = [];
        
        const selections = await this.interclubsRepositoryService.getSelectionForMatch(matchId,versionId);
        if(selections!==null && selections!==undefined && selections.length>0)
        {
            for(const sel  of selections)
            {
                const user = await this.authService.getUserById(sel.auth_user_id);
                array.push(
                    new InterclubsEnrichedSelectionModel(sel, user)
                );
            }
        }
        return array;
    }

    async deleteSelection(deleteSelectionDTO: DeleteSelectionDTO, connectedUser: AuthUserEntity)
    {
        const existingSelection =  await this.interclubsRepositoryService.findSelection(
            deleteSelectionDTO.match.MatchId,
            deleteSelectionDTO.version.id,
            deleteSelectionDTO.position,
        );

        if(existingSelection!==null && existingSelection!==undefined)
        {
            return this.interclubsRepositoryService.delete(existingSelection);
        }
    }

    async publishSemaineVersion(publishSelectionDTO: PublishSelectionDTO, connectedUser: AuthUserEntity): Promise< InterclubsSemaineVersionEntity >
    {
        const workingVersion: InterclubsSemaineVersionEntity = await this.interclubsRepositoryService.getSemaineVersionById(publishSelectionDTO.version.id);
        workingVersion.semaine_version_statut='published';
        return this.interclubsRepositoryService.saveSemaineVersion(workingVersion);
    }

    async updateLdfParticipant(participant: LdfParticipantDTO, connectedUser: AuthUserEntity): Promise< InterclubsLdfParticipantEntity >
    {
        const participantId=participant.id;
        
        const e: InterclubsLdfParticipantEntity = await this.interclubsRepositoryService.getInterclubsLDFParticipantById(participant.id);
        logger.debug('update entity '+participant.id,e);
        if(e!==null && e!==undefined)
        {
            logger.debug('update entity ',e);
            e.authUserId=participant.authUserId;
            return this.interclubsRepositoryService.saveInterclubsLdfParticipant(e);
        }
        else
        {
            logger.debug('update entity - participant not found by id', participant);   
        }
        return e;
    }
}
