import { ParametreRepositoryService } from '../../repository/parametre/services/parametre-repository.service';
import { Injectable } from '@nestjs/common';
import { ParametreEntity } from '../../repository/parametre/entities/parameter.entity';
import { ParametreType } from '../enum/parametre.enum';

@Injectable()
export class ParametreService 
{
    constructor(
        private readonly parametreRepositoryService: ParametreRepositoryService,
    ) {}

    async getAllParametres(): Promise< ParametreEntity[] >
    {
        return this.parametreRepositoryService.getAllParametres();
    }

    async findParametreByKey(parametreType: ParametreType): Promise< ParametreEntity >
    {
        return this.parametreRepositoryService.findParametreByKey(parametreType);
    }

}
