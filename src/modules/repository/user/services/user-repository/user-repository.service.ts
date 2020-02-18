import { Injectable, Inject } from '@nestjs/common';
import { AuthUserEntity } from '../../entities/auth-user.entity';

import * as log4js from 'log4js';
import { Repository } from 'typeorm';
const logger = log4js.getLogger('UserRepositoryService');

@Injectable()
export class UserRepositoryService 
{
    constructor(
        @Inject('UserRepositoryToken')
        private readonly userRepository: Repository<AuthUserEntity>,
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
        const user=this.userRepository.findOne( { /*username:*/ username});
        logger.debug('found user?', user);
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

    async saveUser(user: AuthUserEntity): Promise<AuthUserEntity> {
        // return this.authUserRepository.save(user);
        return null;
    }
}
