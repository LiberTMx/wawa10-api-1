import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ParametreEntity } from '../entities/parameter.entity';
import { ParametreType } from '../../../parametre/enum/parametre.enum';

@Injectable()
export class ParametreRepositoryService 
{
    constructor(
        @Inject('parametreRepositoryToken')
        private readonly parametreRepository: BaseRepository<ParametreEntity>,
    ) {}

    async getAllParametres(): Promise< ParametreEntity[] >
    {
        return this.parametreRepository
            .createQueryBuilder('parametre')
            .orderBy('parametre.paramKey', 'ASC')
            .getMany();
    }

    async findParametreByKey(parametreType: ParametreType): Promise< ParametreEntity >
    {
        return this.parametreRepository.createQueryBuilder('parametre')
            .where('parametre.paramKey = :key', {key: parametreType})
            .getOne();
    }
}
