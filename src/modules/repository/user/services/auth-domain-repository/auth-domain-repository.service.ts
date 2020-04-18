import { Injectable, Inject } from '@nestjs/common';
import { AuthUserEntity } from '../../entities/auth-user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import * as log4js from 'log4js';
import { AuthDomainEntity } from '../../entities/auth-domain.entity';
import { AuthDomainModel } from '../../model/auth-domain.model';
import { AuthFonctionModel } from '../../model/auth-fonction.model';
import { AuthFonctionEntity } from '../../entities/auth-fonction.entity';
const logger = log4js.getLogger('AuthDomainRepositoryService');

@Injectable()
export class AuthDomainRepositoryService 
{
    constructor(
        @Inject('AuthDomainRepositoryToken')
        private readonly authDomainRepository: BaseRepository<AuthDomainEntity>,
    ) {}
    
    async getAllAuthDomains(): Promise<AuthDomainEntity[]>
    {
        return this.authDomainRepository.find({ order: { domain: 'ASC' } });
    }

    async findDomainById(domainId: number): Promise<AuthDomainEntity> 
    {
        return this.authDomainRepository.findOne({ where: { id: domainId } });
    }

    async findDomainName(domain: string): Promise<AuthDomainEntity> 
    {
        return this.authDomainRepository.findOne({ where: { domain } });
    }

    async saveDomain(domain: AuthDomainEntity): Promise<AuthDomainEntity> 
    {
        return this.authDomainRepository.save(domain);
    }

    async createAuthDomain(authDomainModel: AuthDomainModel): Promise<AuthDomainEntity>
    {
        const domain= new AuthDomainEntity();
        domain.domain=authDomainModel.domainName;
        domain.commentaire=authDomainModel.domainCommentaire;
        await this.saveDomain(domain);
        return await this.findDomainName(domain.domain);
    }

}
