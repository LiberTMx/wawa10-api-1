import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AuthGroupEntity } from '../../entities/auth-group.entity';
import { AuthGroupModel } from '../../model/auth-group.model';
import { AuthUserGroupEntity } from '../../entities/auth-user-group.entity';

@Injectable()
export class AuthGroupRepositoryService 
{
    constructor(
        @Inject('AuthGroupRepositoryToken')
        private readonly authGroupRepository: BaseRepository<AuthGroupEntity>,

        @Inject('AuthUserGroupRepositoryToken')
        private readonly authUserGroupRepository: BaseRepository<AuthUserGroupEntity>,

    ) {}
    
    async getAllAuthGroups(): Promise<AuthGroupEntity[]>
    {
        return this.authGroupRepository.find({ order: { name: 'ASC' } });
    }

    async findGroupById(groupId: number): Promise<AuthGroupEntity> 
    {
        return this.authGroupRepository.findOne({ where: { id: groupId } });
    }

    async findGroupByName(name: string): Promise<AuthGroupEntity> 
    {
        return this.authGroupRepository.findOne({ where: { name } });
    }

    async saveGroup(group: AuthGroupEntity): Promise<AuthGroupEntity> 
    {
        return this.authGroupRepository.save(group);
    }

    async createAuthGroup(groupModel: AuthGroupModel): Promise<AuthGroupEntity>
    {
        const group= new AuthGroupEntity();
        group.name=groupModel.name;
        group.commentaire=groupModel.commentaire;
        await this.saveGroup(group);
        return await this.findGroupByName(group.name);
    }

    async getGroupsForUser(userId: number): Promise<AuthGroupEntity[]>
    {

        /*
            select g.* from auth_group g
            inner join auth_user_group ug on ug.group_id = g.id and ug.user_id = 344;

        */
        const roleEntityManager=this.authGroupRepository.manager;
        return roleEntityManager.query(`select g.* from auth_group g`+
        ` inner join auth_user_group ug on ug.group_id = g.id and ug.user_id = ${userId} ` );
    }

    async deleteGroupsForUser(userId: number)
    {
        const groups: AuthUserGroupEntity[] =
            await this.authUserGroupRepository.createQueryBuilder('ug')
                .where('ug.authUserId = :userId', {userId})
                .getMany();

        if(groups!==null && groups!==undefined && groups.length>0)
        {
            for(const ug of groups)
            {
                await this.authUserGroupRepository.delete(ug);
            }
        }
    }
}
