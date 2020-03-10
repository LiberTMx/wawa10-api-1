import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import * as log4js from 'log4js';
import { Repository } from 'typeorm';
import { CredentialEntity } from '../entities/credential.entity';
const logger = log4js.getLogger('CredentialRepositoryService');

@Injectable()
export class CredentialRepositoryService 
{
    constructor(
        @Inject('CredentialRepositoryToken')
        private readonly credentialRepository: BaseRepository<CredentialEntity>,
    ) {}
    
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
}
