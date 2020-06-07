import { Injectable, Inject, Delete } from '@nestjs/common';
import { BaseRepository, Transactional } from 'typeorm-transactional-cls-hooked';
import {getConnection} from 'typeorm';
import { StageEntity } from '../entities/stage.entity';

import * as log4js from 'log4js';
const logger = log4js.getLogger('StageRepositoryService');

@Injectable()
export class StageRepositoryService 
{
    constructor(
        @Inject('stageRepositoryToken')
        private readonly stageRepository: BaseRepository<StageEntity>,
    ) {}
    
    async saveStage(stage: StageEntity): Promise<StageEntity>
    {
        return this.stageRepository.save(stage);
    }

}
