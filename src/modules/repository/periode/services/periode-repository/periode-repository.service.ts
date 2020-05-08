import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PeriodeEntity } from '../../entities/periode.entity';
import { CreatePeriodeDTO } from '../../../../../shared/dto/periode/create-periode.dto';

@Injectable()
export class PeriodeRepositoryService 
{

    constructor(
        @Inject('periodeRepositoryToken')
        private readonly periodeRepository: BaseRepository<PeriodeEntity>,
    ) {}

    async getAllPeriodes(): Promise< PeriodeEntity[] >
    {
      return this.periodeRepository.find();
    }

    async savePeriode(periode: PeriodeEntity): Promise< PeriodeEntity >
    {
      return this.periodeRepository.save(periode);
    }

}
