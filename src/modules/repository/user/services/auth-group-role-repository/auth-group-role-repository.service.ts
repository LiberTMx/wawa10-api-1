import { Injectable, Inject } from '@nestjs/common';
import { AuthGroupRoleEntity } from '../../entities/auth-group-role.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AuthGroupRoleRepositoryService 
{
    constructor(
        @Inject('AuthGroupRoleRepositoryToken')
        private readonly groupRoleRepository: BaseRepository<AuthGroupRoleEntity>,
    ) {}

    async getAllAuthGroupRoles(): Promise<AuthGroupRoleEntity[]>
    {
        return this.groupRoleRepository.find();
    }
}
