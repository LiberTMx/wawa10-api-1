import { Injectable, Inject } from '@nestjs/common';
import { AuthUserEntity } from '../../entities/auth-user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AuthRoleEntity } from '../../entities/auth-role.entity';

import * as log4js from 'log4js';
import { AuthFonctionEntity } from '../../entities/auth-fonction.entity';
import { AuthUserFonctionEntity } from '../../entities/auth-user-fonction.entity';
import { AuthUserGroupEntity } from '../../entities/auth-user-group.entity';
const logger = log4js.getLogger('UserRepositoryService');

@Injectable()
export class UserRepositoryService 
{
    constructor(
        @Inject('AuthUserRepositoryToken')
        private readonly userRepository: BaseRepository<AuthUserEntity>,

        @Inject('AuthRoleRepositoryToken')
        private readonly userRoleRepository: BaseRepository<AuthRoleEntity>,

        @Inject('AuthFonctionRepositoryToken')
        private readonly userFonctionRepository: BaseRepository<AuthFonctionEntity>, 

        @Inject('AuthUserFonctionRepositoryToken')
        private readonly authUserFonctionRepository: BaseRepository<AuthUserFonctionEntity>, 

        @Inject('AuthUserGroupRepositoryToken')
        private readonly authUserGroupRepository: BaseRepository<AuthUserGroupEntity>, 
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

    async findById(userID: number): Promise<AuthUserEntity> 
    {
        const user=this.userRepository.createQueryBuilder('authUser')
            .where('authUser.id = :id', {id: userID})
            .getOne();
        return user;
    }

    async saveUser(user: AuthUserEntity): Promise<AuthUserEntity> 
    {
        return this.userRepository.save(user);
    }

    async getUserList(readAll: boolean = false): Promise<AuthUserEntity[]>
    {
        if(readAll===true)
        {
            logger.info('retrieveing all users, even marked deleted');

            return this.userRepository
            .createQueryBuilder('authUser')
            //.where(' authUser.deletedAt is null ')
            .orderBy('authUser.nom', 'ASC')
            .addOrderBy('authUser.prenom', 'ASC')
            .getMany();
        }

        return this.userRepository
            .createQueryBuilder('authUser')
            .where(' authUser.deletedAt is null ')
            .orderBy('authUser.nom', 'ASC')
            .addOrderBy('authUser.prenom', 'ASC')
            .getMany();
    } 

    async getAllUserFonction(): Promise<AuthFonctionEntity[]>
    {
        return this.userFonctionRepository
            .createQueryBuilder('authUserFonction')
            .orderBy('authUserFonction.code', 'ASC')
            .getMany();
    } 

    async saveFonction(fonction: AuthFonctionEntity): Promise<AuthFonctionEntity> 
    {
        return this.userFonctionRepository.save(fonction);
    }

    async findFonctionByCode(code: string): Promise<AuthFonctionEntity> 
    {
        const fonction=this.userFonctionRepository.createQueryBuilder('authUserFonction')
            .where('authUserFonction.code = :code', {code})
            .getOne();
        return fonction;
    }
    
    async findUserByLicence(licence: string): Promise<AuthUserEntity>
    {
        const user=this.userRepository.createQueryBuilder('authUser')
            .where('authUser.licence = :licence', { licence })
            .getOne();
        return user;
    }

    async saveAuthUserFonction(auf: AuthUserFonctionEntity): Promise<AuthUserFonctionEntity>
    {
        return this.authUserFonctionRepository.save(auf);
    }

    async saveAuthUserGroup(aug: AuthUserGroupEntity): Promise<AuthUserGroupEntity>
    {
        return this.authUserGroupRepository.save(aug);
    }
}
