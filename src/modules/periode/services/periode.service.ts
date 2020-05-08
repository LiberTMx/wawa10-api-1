import { Injectable, Logger } from '@nestjs/common';
import { PeriodeRepositoryService } from '../../repository/periode/services/periode-repository/periode-repository.service';
import { PeriodeEntity } from '../../repository/periode/entities/periode.entity';
import { CreatePeriodeDTO } from '../../../shared/dto/periode/create-periode.dto';
import { AuthUserEntity } from '../../repository/user/entities/auth-user.entity';

import * as log4js from 'log4js';
const logger = log4js.getLogger('PeriodeService');

@Injectable()
export class PeriodeService 
{
    constructor(
        private readonly periodeRepositoryService: PeriodeRepositoryService,
    ) {}

    async getAllPeriodes(): Promise< PeriodeEntity[] >
    {
      return this.periodeRepositoryService.getAllPeriodes();
    }

    async savePeriode(periode: PeriodeEntity): Promise< PeriodeEntity >
    {
      return this.periodeRepositoryService.savePeriode(periode);
    }

    async createPeriode(createPeriodeDTO: CreatePeriodeDTO, connectedUser: AuthUserEntity): Promise< PeriodeEntity >
    {
      logger.debug('Creating periode using data', JSON.stringify(createPeriodeDTO) );
      const periode=new PeriodeEntity();
      periode.dateDebut=createPeriodeDTO.dateDebut;
      periode.dateFin=createPeriodeDTO.dateFin;
      periode.description=createPeriodeDTO.description;
      periode.isForEntrainements=createPeriodeDTO.isForEntrainements;
      periode.isForStages=createPeriodeDTO.isForStages;
      periode.nom=createPeriodeDTO.nom;
      periode.updatedAt=new Date();
      periode.updatedBy=connectedUser.username;
      return await this.savePeriode(periode);
    }
}
