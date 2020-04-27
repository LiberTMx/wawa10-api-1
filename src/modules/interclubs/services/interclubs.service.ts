import { Injectable } from '@nestjs/common';
import { InterclubsType } from '../enum/interclubs.enum';
import { InterclubsSemaineEntity } from 'src/modules/repository/interclubs/entities/interclubs-semaine.entity';
import { InterclubsRepositoryService } from 'src/modules/repository/interclubs/services/interclubs-repository.service';
import { InterclubsCategoryEntity } from 'src/modules/repository/interclubs/entities/interclub-category.entity';

@Injectable()
export class InterclubsService 
{
    constructor(
        private readonly interclubsRepositoryService: InterclubsRepositoryService,
    ) {}

    /*
    async getAllinterclubss(): Promise< InterclubsEntity[] >
    {
        return this.interclubsRepositoryService.getAllinterclubss();
    }

    async findinterclubsByKey(interclubsType: InterclubsType): Promise< InterclubsEntity >
    {
        return this.interclubsRepositoryService.findinterclubsByKey(interclubsType);
    }
    */

    async getInterclubsSemaineByInterclubType(interclubsType: InterclubsType) : Promise< InterclubsSemaineEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsSemaineByInterclubType(interclubsType);
    }

    async getInterclubsCategory() : Promise< InterclubsCategoryEntity[] >
    {
        return this.interclubsRepositoryService.getInterclubsCategory();
    }
}
