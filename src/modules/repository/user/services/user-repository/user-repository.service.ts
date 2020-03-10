import { Injectable, Inject } from '@nestjs/common';
import { AuthUserEntity } from '../../entities/auth-user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import * as log4js from 'log4js';
import { Repository } from 'typeorm';
const logger = log4js.getLogger('UserRepositoryService');

@Injectable()
export class UserRepositoryService 
{
    constructor(
        @Inject('AuthUserRepositoryToken')
        private readonly userRepository: BaseRepository<AuthUserEntity>,
    ) {}
    
    async findByUserName(username: string): Promise<AuthUserEntity> {
        /*
        const qb = this.authUserRepository.createQueryBuilder('authUser');
        return qb.innerJoinAndSelect(AuthUserService.AUTHUSER_AUTHUSERGROUP, 'authUserGroup')
        .innerJoinAndSelect(AuthUserService.AUTHUSERGROUP_AUTHGROUP, 'authGroup')
        .innerJoinAndSelect(AuthUserService.AUTHGROUP_AUTHGROUPROLE, 'authGroupRole')
        .innerJoinAndSelect(AuthUserService.AUTHGROUPROLE_AUTHROLENAME, 'authRoleName')
        .where('authUser.username = :userName', {userName})
        .getOne();
        */
       //return null;

        logger.debug('UserRepositoryService::findByUserName - username:'+username);
        /*
        const user=this.userRepository.findOne( {
            where: { delete_at: IsNotNull(), username },
        });*/

        const user=this.userRepository.createQueryBuilder('authUser')
            .where('authUser.username = :username', {username})
            .andWhere('authUser.deleted_at is null')
            .getOne();
        return user;
    }

    async findById(userID: number): Promise<AuthUserEntity> {
        /*
        const qb = this.authUserRepository.createQueryBuilder('authUser');
        return qb.innerJoinAndSelect(AuthUserService.AUTHUSER_AUTHUSERGROUP, 'authUserGroup')
        .innerJoinAndSelect(AuthUserService.AUTHUSERGROUP_AUTHGROUP, 'authGroup')
        .innerJoinAndSelect(AuthUserService.AUTHGROUP_AUTHGROUPROLE, 'authGroupRole')
        .innerJoinAndSelect(AuthUserService.AUTHGROUPROLE_AUTHROLENAME, 'authRoleName')
        .where('authUser.id = :userID', {userID})
        .getOne();
        */
       return null;
    }

    async saveUser(user: AuthUserEntity): Promise<AuthUserEntity> 
    {
        return this.userRepository.save(user);
    }
}
