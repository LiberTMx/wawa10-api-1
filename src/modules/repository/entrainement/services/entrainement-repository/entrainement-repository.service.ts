import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntrainementClasseEntity } from '../../entities/entrainement-classe.entity';

import * as log4js from 'log4js';
import { ClasseStatusType } from '../../../../entrainement/types/classe-status.enum';
import { EntrainementClasseGroupeEntity } from '../../entities/entrainement-classe-groupe.entity';
import { EntrainementGroupeSeanceEntity } from '../../entities/entrainement-groupe-seance.entity';
const logger = log4js.getLogger('EntrainementRepositoryService');

@Injectable()
export class EntrainementRepositoryService 
{
    constructor(
        @Inject('entrainementClasseRepositoryToken')
        private readonly classeRepository: BaseRepository<EntrainementClasseEntity>,

        @Inject('entrainementClasseGroupeRepositoryToken')
        private readonly classeGroupeRepository: BaseRepository<EntrainementClasseGroupeEntity>,

        @Inject('entrainementGroupeSeanceRepositoryToken')
        private readonly groupeSeanceRepository: BaseRepository<EntrainementGroupeSeanceEntity>,

    ) {}

    async saveClasse(classe: EntrainementClasseEntity): Promise<EntrainementClasseEntity> 
    {
        return this.classeRepository.save(classe);
    }

    async saveClasseGroupe(groupe: EntrainementClasseGroupeEntity): Promise<EntrainementClasseGroupeEntity> 
    {
        return this.classeGroupeRepository.save(groupe);
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

    async getEntrainementClasseById(classeId: number): Promise<EntrainementClasseEntity>
    {
        return this.classeRepository
            .createQueryBuilder('classe')
            .where(' classe.id = :id ', { id: classeId })
            .getOne();
    }

    async getEntrainementClasseGroupes(classeId: number): Promise<EntrainementClasseGroupeEntity[]>
    {
        return this.classeGroupeRepository
            .createQueryBuilder('groupe')
            .where('groupe.classeId = :classeId ', { classeId })
            .orderBy('groupe.showOrder', 'ASC')
            .getMany();
    }

    async saveGroupeSeance(seance: EntrainementGroupeSeanceEntity): Promise<EntrainementGroupeSeanceEntity>
    {
        return this.groupeSeanceRepository.save(seance);
    }

    async getEntrainementGroupeSeances(groupeId: number): Promise<EntrainementGroupeSeanceEntity[]>
    {
        return this.groupeSeanceRepository
            .createQueryBuilder('seance')
            .where('seance.groupeId = :gid ', { gid: groupeId })
            .orderBy('seance.heureDebut', 'ASC')
            .getMany();
    }
}
