import { Injectable, Inject, Delete } from '@nestjs/common';
import { BaseRepository, Transactional } from 'typeorm-transactional-cls-hooked';

import * as log4js from 'log4js';
import { AfttAllDataEntity } from '../entities/aftt-all-data.entity';
import {getConnection} from 'typeorm';
import { AfttTeamEntity } from '../entities/aftt-team.entity';
import { AfttDivisionEntity } from '../entities/aftt-division.entity';
import { AfttMatchEntity } from '../entities/aftt-match.entity';
import { AfttDivisionCategoryEntity } from '../entities/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from '../entities/aftt-member-by-category.entity';
const logger = log4js.getLogger('AfttRepositoryService');

@Injectable()
export class AfttRepositoryService 
{
    constructor(
        @Inject('afttAllDataRepositoryToken')
        private readonly afttAllDataRepository: BaseRepository<AfttAllDataEntity>,
        @Inject('afttTeamRepositoryToken')
        private readonly afttTeamRepository: BaseRepository<AfttTeamEntity>,
        @Inject('afttDivisionRepositoryToken')
        private readonly afttDivisionRepository: BaseRepository<AfttDivisionEntity>,
        @Inject('afttDivisionCategoryRepositoryToken')
        private readonly afttDivisionCategoryRepository: BaseRepository<AfttDivisionCategoryEntity>,
        @Inject('afttMatchRepositoryToken')
        private readonly afttMatchRepository: BaseRepository<AfttMatchEntity>,
        @Inject('afttMemberByCategoryEntityRepositoryToken')
        private readonly afttMemberByCategoryEntityRepository: BaseRepository<AfttMemberByCategoryEntity>,
    ) {}
    
    async save(allData: AfttAllDataEntity): Promise<AfttAllDataEntity>
    {
        return this.afttAllDataRepository.save(allData);
    }

    async createAfttAllData(teams: string, divisions: string, matches: string, membres: string): Promise<AfttAllDataEntity>
    {
        logger.debug('teams length:'+teams.length);
        logger.debug('divisions length:'+divisions.length);
        logger.debug('matches length:'+matches.length);
        logger.debug('membres length:'+membres.length);

        const data = new AfttAllDataEntity();
        data.teams=teams;
        data.divisions=divisions;
        data.matches=matches;
        data.membres=membres;
        data.createdAt=new Date();
        data.createdById=0;
        return await this.save(data);
    }

    /*
    async findByUserName(username: string): Promise<CredentialEntity> 
    {
        logger.debug('CredentialRepositoryService::findByUserName - username:'+username);
        const user=this.credentialRepository.createQueryBuilder('credential')
            .where('credential.username = :username', {username})
            .getOne();
        return user;
    }

    async createCredential(username: string, password: string): Promise<CredentialEntity>
    {
        const credential = new CredentialEntity();
        credential.username=username;
        credential.credential=password;
        return this.save(credential);
    }

    async save(credential: CredentialEntity): Promise<CredentialEntity>
    {
        return this.credentialRepository.save(credential);
    }
    */

    async getLastAfttSync(): Promise<any>
    {
        /*
        SELECT  *
            FROM aftt_all_data aftt 
            INNER JOIN 
            (
            SELECT 
            MAX(created_at) max_time
            FROM aftt_all_data
            GROUP BY Date(`created_at`)
            ) AS t
            ON aftt.created_at = t.max_time

            id: number;

            @Column({name: 'created_at'})
            createdAt: Date;

            @Column({name: 'created_by_id'})
            createdById: number;

            @Column({name: 'teams_data'})
            teams: string;

            @Column({name: 'divisions_data'})
            divisions: string;

            @Column({name: 'matches_data'})
            matches: string;

            @Column({name: 'membres_data'})
            membres: string;
        */
        const rawData: any=this.afttAllDataRepository.query(
            'SELECT  id,  created_at as createdAt, created_by_id as createdById, teams_data as teams, ' +
            ' divisions_data as divisions, matches_data as matches, membres_data as membres '+
            'FROM aftt_all_data aftt  ' +
            'INNER JOIN  ' +
            '( ' +
            'SELECT  ' +
            'MAX(created_at) max_time ' +
            'FROM aftt_all_data ' +
            //'GROUP BY Date(`created_at`) ' +
            ') AS t ' +
            'ON aftt.created_at = t.max_time'  );

        return rawData;
    }

    printTypeNames<T>(obj: T) 
    {
        const objectKeys = Object.keys(obj) as Array<keyof T>;
        for (const key of objectKeys)
        {
            logger.debug('key:' + key);
        }
    }

    async getLastAfttSyncId(): Promise<any>
    {
        const rawData: any=this.afttAllDataRepository.query(
            'SELECT  id, created_at as createdAt '+
            'FROM aftt_all_data aftt  ' +
            'INNER JOIN  ' +
            '( ' +
            'SELECT  ' +
            'MAX(created_at) max_time ' +
            'FROM aftt_all_data ' +
            //'GROUP BY Date(`created_at`) ' +
            ') AS t ' +
            'ON aftt.created_at = t.max_time'  );

        return rawData;
    }

    @Transactional()
    async removeAllAfttDataForSync(syncId: number)
    {
        await getConnection().createQueryBuilder().delete().from(AfttTeamEntity)
                .where('aftt_LastSyncId = :syncId', { syncId })
                .execute();

        await getConnection().createQueryBuilder().delete().from(AfttDivisionEntity)
                .where('aftt_LastSyncId = :syncId', { syncId })
                .execute();

        await getConnection().createQueryBuilder().delete().from(AfttMatchEntity)
                .where('aftt_LastSyncId = :syncId', { syncId })
                .execute();
        await getConnection().createQueryBuilder().delete().from(AfttMemberByCategoryEntity)
                .where('aftt_LastSyncId = :syncId', { syncId })
                .execute();
        //await this.afttRepositoryService.removeAllAfttDataForSync(syncId);
    }

    async saveAfttTeam(team: AfttTeamEntity): Promise<AfttTeamEntity>
    {
        return this.afttTeamRepository.save(team);
    }

    async saveAfttDivision(division: AfttDivisionEntity): Promise<AfttDivisionEntity>
    {
        return this.afttDivisionRepository.save(division);
    }

    async saveAfttMatch(match: AfttMatchEntity): Promise<AfttMatchEntity>
    {
        return this.afttMatchRepository.save(match);
    }

    async getDivisionCategoryList(): Promise<AfttDivisionCategoryEntity[]>
    {
        return this.afttDivisionCategoryRepository
            .find({ order: { order: 'ASC' } });
    }

    async saveAfttMemberByCategory(membre: AfttMemberByCategoryEntity): Promise<AfttMemberByCategoryEntity>
    {
        return this.afttMemberByCategoryEntityRepository.save(membre);
    }

    async getAfttDivisions(syncId: number): Promise<AfttDivisionEntity[]>
    {
        return this.afttDivisionRepository
            .createQueryBuilder('aftt_division')
            .where(' aftt_division.aftt_LastSyncId = :syncId', { syncId })
            //.andWhere(' news.id = document.newsId')
            //.orderBy('news.showOrder')
            //.addOrderBy('news.createdAt DESC')
            .getMany();
    }

    async getAfttTeams(syncId: number): Promise<AfttTeamEntity[]>
    {
        return this.afttTeamRepository
            .createQueryBuilder('aftt_division')
            .where(' aftt_division.aftt_LastSyncId = :syncId', { syncId })
            //.andWhere(' news.id = document.newsId')
            //.orderBy('news.showOrder')
            //.addOrderBy('news.createdAt DESC')
            .getMany();
    }

    async getAfttMembers(syncId: number): Promise<AfttMemberByCategoryEntity[]>
    {
        return this.afttMemberByCategoryEntityRepository
            .createQueryBuilder('aftt_member_by_category')
            .where(' aftt_member_by_category.aftt_LastSyncId = :syncId', { syncId })
            //.andWhere(' news.id = document.newsId')
            //.orderBy('news.showOrder')
            //.addOrderBy('news.createdAt DESC')
            .getMany();
    }

}
