import { Injectable, Inject } from '@nestjs/common';
import { AuthUserEntity } from '../../entities/auth-user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import * as log4js from 'log4js';
import { Repository } from 'typeorm';
import { AuthRoleEntity } from '../../entities/auth-role.entity';
import { AuthDomainEntity } from '../../entities/auth-domain.entity';
const logger = log4js.getLogger('AuthDomainRepositoryService');

@Injectable()
export class AuthDomainRepositoryService 
{
    constructor(
        @Inject('AuthDomainRepositoryToken')
        private readonly authDomainRepository: BaseRepository<AuthDomainEntity>,
    ) {}
    
    async findDomainById(domainId: number): Promise<AuthDomainEntity> {
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

    async getUserRoles(userid: number): Promise<any[]>
    {
        /*
            select r.* from auth_role r
            inner join auth_group_role gr on gr.role_id = r.id
            inner join auth_group g on g.id=gr.group_id
            inner join auth_user_group ug on ug.group_id=g.id and ug.user_id=
            (select id from auth_user where username='guy')
            ;
        */
       const roleEntityManager=this.userRoleRepository.manager;
       return roleEntityManager.query(`select r.* from auth_role r`+
       ` inner join auth_group_role gr on gr.role_id = r.id ` +
       ` inner join auth_group g on g.id=gr.group_id ` +
       ` inner join auth_user_group ug on ug.group_id=g.id and ug.user_id= ${userid} ` );
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
