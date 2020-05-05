import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InterclubsType } from '../../../interclubs/enum/interclubs.enum';
import { InterclubsSemaineEntity } from '../entities/interclubs-semaine.entity';
import { InterclubsDivisionEntity } from '../entities/interclubs-division.entity';
import { InterclubsTeamEntity } from '../entities/interclubs-team.entity';
import { InterclubsCategoryEntity } from '../entities/interclubs-category.entity';
import { InterclubsMatchEntity } from '../entities/interclubs-match.entity';
import { AfttMatchEntity } from '../../aftt/entities/aftt-match.entity';
import { InterclubsLdfParticipantEntity } from '../entities/interclubs-ldf-participant.entity';
import { InterclubsLdfByCategoryEntity } from '../entities/interclubs-ldf-by-category.entity';
import { InterclubsSemaineVersionEntity } from '../entities/interclubs-semaine-version.entity';

@Injectable()
export class InterclubsRepositoryService 
{
    constructor(
     /*    @Inject('interclubsRepositoryToken')
        private readonly interclubsRepository: BaseRepository<interclubsEntity>, */
        @Inject('interclubsSemaineRepositoryToken')
        private readonly interclubsSemaineRepository: BaseRepository<InterclubsSemaineEntity>,
        @Inject('interclubsCategoryRepositoryToken')
        private readonly interclubsCategoryRepository: BaseRepository<InterclubsCategoryEntity>,
        @Inject('interclubsDivisionRepositoryToken')
        private readonly interclubsDivisionRepository: BaseRepository<InterclubsDivisionEntity>,
        @Inject('interclubsTeamRepositoryToken')
        private readonly interclubsTeamRepository: BaseRepository<InterclubsTeamEntity>,
        @Inject('interclubsMatchRepositoryToken')
        private readonly interclubsMatchRepository: BaseRepository<InterclubsMatchEntity>,

        @Inject('interclubsLdfParticipantRepositoryToken')
        private readonly interclubsLdfParticipantRepository: BaseRepository<InterclubsLdfParticipantEntity>,
        @Inject('interclubsLdfByCategoryRepositoryToken')
        private readonly interclubsLdfByCategoryRepository: BaseRepository<InterclubsLdfByCategoryEntity>,

        @Inject('interclubsSemaineVersionRepositoryToken')
        private readonly interclubsSemaineVersionProvider: BaseRepository<InterclubsSemaineEntity>,

    ) {}

/*     async getAllinterclubss(): Promise< interclubsEntity[] >
    {
        return this.interclubsRepository
            .createQueryBuilder('interclubs')
            .orderBy('interclubs.paramKey', 'ASC')
            .getMany();
    }

    async findinterclubsByKey(interclubsType: InterclubsType): Promise< interclubsEntity >
    {
        return this.interclubsRepository.createQueryBuilder('interclubs')
            .where('interclubs.paramKey = :key', {key: interclubsType})
            .getOne();
    } */

    async getInterclubsSemaineByInterclubType(interclubsType: InterclubsType): Promise< InterclubsSemaineEntity[] >
    {
        return this.interclubsSemaineRepository.find();
    }

    async getInterclubsCategories(): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsCategoryRepository.find();
    }

    async getInterclubCategoryByPlayerCategory(playerCategory: number): Promise<InterclubsCategoryEntity>
    {
        return this.interclubsCategoryRepository.createQueryBuilder('interclubsCategory')
            .where('interclubsCategory.playerCategory = :cat', {cat: playerCategory})
            .getOne();
    }

    async saveInterclubCategory(newClubCat: InterclubsCategoryEntity): Promise<InterclubsCategoryEntity>
    {
        return this.interclubsCategoryRepository.save(newClubCat);
    }

    async findInterclubSemaineByCategoryAndWeekNumber(categoryId: number, weekNumber: number, year: number): Promise<InterclubsSemaineEntity>
    {
        return this.interclubsSemaineRepository.createQueryBuilder('semaine')
            .where('semaine.afftDivisionCategoryId = :cat', { cat: categoryId})
            .andWhere('semaine.weekNumber = :wn ', { wn: weekNumber})
            .andWhere('semaine.year = :year ', { year })
            .getOne();
    }

    async saveInterclubSemaine(semaine: InterclubsSemaineEntity): Promise<InterclubsSemaineEntity>
    {
        return this.interclubsSemaineRepository.save(semaine);
    }

    async findInterclubsDivisionByAfttDivisionId(afttDivisionId: number): Promise<InterclubsDivisionEntity>
    {
        return this.interclubsDivisionRepository.createQueryBuilder('division')
            .where('division.DivisionId = :divId', { divId: afttDivisionId})
            .getOne();
    }

    async saveInterclubsDivision(division: InterclubsDivisionEntity): Promise<InterclubsDivisionEntity>
    {
        return this.interclubsDivisionRepository.save(division);
    }

    async findInterclubsTeamByAfttTeamId(teamId: string): Promise<InterclubsTeamEntity>
    {
        return this.interclubsTeamRepository.createQueryBuilder('team')
            .where('team.TeamId = :teamId', { teamId })
            .getOne();
    }

    async saveInterclubsTeam(team: InterclubsTeamEntity): Promise<InterclubsTeamEntity>
    {
        return this.interclubsTeamRepository.save(team);
    }

    async getInterclubsDivisions(): Promise< InterclubsDivisionEntity[] >
    {
        return this.interclubsDivisionRepository.find();
    }

    async getInterclubsTeams(): Promise< InterclubsTeamEntity[] >
    {
        return this.interclubsTeamRepository.find();
    }

    async findInterclubsMatchByMatchId(afttMatch: AfttMatchEntity): Promise<InterclubsMatchEntity>
    {
        return this.interclubsMatchRepository.createQueryBuilder('match')
            .where('match.MatchId = :matchId', { matchId: afttMatch.MatchId })
            .getOne();
    }

    async saveInterclubMatch(match: InterclubsMatchEntity): Promise<InterclubsMatchEntity>
    {
        return this.interclubsMatchRepository.save(match);
    }

    async findInterclubsLdfParticipantByLicence(licence: string): Promise<InterclubsLdfParticipantEntity>
    {
        return this.interclubsLdfParticipantRepository.createQueryBuilder('participant')
            .where('participant.licence = :licence', { licence })
            .getOne();
    }

    async findInterclubsLdfByCategory(participantId: number, playerCategory: number): Promise<InterclubsLdfByCategoryEntity>
    {
        return this.interclubsLdfByCategoryRepository.createQueryBuilder('ldf')
            .where('ldf.participantId = :participantId', { participantId })
            .andWhere('ldf.playerCategory = :playerCategory', { playerCategory })
            .getOne();
    }

    async saveInterclubsLdfParticipant(participant: InterclubsLdfParticipantEntity): Promise<InterclubsLdfParticipantEntity>
    {
        return this.interclubsLdfParticipantRepository.save(participant);
    }

    async InterclubsLdfByCategoryEntity(ldfCategory: InterclubsLdfByCategoryEntity): Promise<InterclubsLdfByCategoryEntity>
    {
        return this.interclubsLdfByCategoryRepository.save(ldfCategory);
    }

    async getInterclubsMatches(): Promise< InterclubsMatchEntity[] >
    {
        return this.interclubsMatchRepository.find();
    }

    async getInterclubsLDFParticipants(): Promise< InterclubsLdfParticipantEntity[] >
    {
        return this.interclubsLdfParticipantRepository.find();
    }

    async getInterclubsLDFByCategory(): Promise< InterclubsLdfByCategoryEntity[] >
    {
        return this.interclubsLdfByCategoryRepository.find();
    }

    async getLastSemaineVersion(semaineId: number): Promise< InterclubsSemaineVersionEntity >
    {
        const rawData: any=this.interclubsSemaineVersionProvider.query(
            'SELECT  * '+
            'FROM interclubs_semaine_version  isv ' +
            'INNER JOIN  ' +
            '( ' +
            'SELECT  ' +
            'MAX(vv.semaine_version) max_version ' +
            'FROM interclubs_semaine_version vv ' +
            'where semaine_id = '+ semaineId +
            //'GROUP BY Date(`created_at`) ' +
            ') AS t ' +
            'ON isv.semaine_version = t.max_version '  +
            'where semaine_id = '+ semaineId    );

        return rawData;
    }

    async saveSemaineVersion(semaineVersion: InterclubsSemaineVersionEntity): Promise< InterclubsSemaineVersionEntity >
    {
        return this.interclubsSemaineVersionProvider.save(semaineVersion);
    }
}
