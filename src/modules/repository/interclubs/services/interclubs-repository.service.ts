import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InterclubsType } from '../../../interclubs/enum/interclubs.enum';
import { InterclubsSemaineEntity } from '../entities/interclubs-semaine.entity';
import { InterclubsCategoryEntity } from '../entities/interclub-category.entity';

@Injectable()
export class InterclubsRepositoryService 
{
    constructor(
     /*    @Inject('interclubsRepositoryToken')
        private readonly interclubsRepository: BaseRepository<interclubsEntity>, */
        @Inject('interclubsSemaineRepositoryToken')
        private readonly interclubsSemaineRepository: BaseRepository<InterclubsSemaineEntity>,
        @Inject('interclubsCategoryRepositoryToken')
        private readonly interclubsCategoryRepository: BaseRepository<InterclubsCategoryEntity>,
    ) {}

/*     async getAllinterclubss(): Promise< interclubsEntity[] >
    {
        return this.interclubsRepository
            .createQueryBuilder('interclubs')
            .orderBy('interclubs.paramKey', 'ASC')
            .getMany();
    }

    async findinterclubsByKey(interclubsType: InterclubsType): Promise< interclubsEntity >
    {
        return this.interclubsRepository.createQueryBuilder('interclubs')
            .where('interclubs.paramKey = :key', {key: interclubsType})
            .getOne();
    } */

    async getInterclubsSemaineByInterclubType(interclubsType: InterclubsType): Promise< InterclubsSemaineEntity[] >
    {
        return this.interclubsSemaineRepository.find();
    }

    async getInterclubsCategories(): Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsCategoryRepository.find();
    }

    async getInterclubCategoryByPlayerCategory(playerCategory: number): Promise<InterclubsCategoryEntity>
    {
        return this.interclubsCategoryRepository.createQueryBuilder('interclubsCategory')
            .where('interclubsCategory.playerCategory = :cat', {cat: playerCategory})
            .getOne();
    }

    async saveInterclubCategory(newClubCat: InterclubsCategoryEntity): Promise<InterclubsCategoryEntity>
    {
        return this.interclubsCategoryRepository.save(newClubCat);
    }
}
