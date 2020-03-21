import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AuthGroupEntity } from '../../entities/auth-group.entity';
import { AuthGroupModel } from '../../model/auth-group.model';

@Injectable()
export class AuthGroupRepositoryService 
{
    constructor(
        @Inject('AuthGroupRepositoryToken')
        private readonly authGroupRepository: BaseRepository<AuthGroupEntity>,
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
}
