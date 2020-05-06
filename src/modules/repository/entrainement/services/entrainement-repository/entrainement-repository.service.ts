import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntrainementClasseEntity } from '../../entities/entrainement-classe.entity';

import * as log4js from 'log4js';
import { ClasseStatusType } from '../../../../entrainement/types/classe-status.enum';
const logger = log4js.getLogger('EntrainementRepositoryService');

@Injectable()
export class EntrainementRepositoryService 
{
    constructor(
        @Inject('entrainementClasseRepositoryToken')
        private readonly classeRepository: BaseRepository<EntrainementClasseEntity>,
    ) {}

    async saveClasse(classe: EntrainementClasseEntity): Promise<EntrainementClasseEntity> 
    {
        return this.classeRepository.save(classe);
    }

    async getEntrainementClasses(readAll: boolean): Promise< EntrainementClasseEntity[] >
    {
        if(readAll===true)
        {
            logger.info('reading all classes even visible or not');

            return this.classeRepository
                .createQueryBuilder('classe')
                .orderBy('classe.showOrder', 'ASC')
                .getMany();
        }

        return this.classeRepository
            .createQueryBuilder('classe')
            .where(' classe.status = :status ', { status: ClasseStatusType.VISIBLE })
            .orderBy('classe.showOrder', 'ASC')
            .getMany();
    }
}
