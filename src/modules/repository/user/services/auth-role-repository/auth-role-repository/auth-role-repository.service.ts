import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AuthRoleEntity } from '../../../entities/auth-role.entity';

@Injectable()
export class AuthRoleRepositoryService 
{
    constructor(
        @Inject('AuthRoleRepositoryToken')
        private readonly userRoleRepository: BaseRepository<AuthRoleEntity>,
    ) {}

    async getAllAuthRoles(): Promise<AuthRoleEntity[]>
    {
        return this.userRoleRepository.find(
            { 
                relations: ['authDomain'],
                order: { role: 'ASC' },
            });
    }
}
