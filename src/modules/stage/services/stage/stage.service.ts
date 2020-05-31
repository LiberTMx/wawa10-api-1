import { Injectable } from '@nestjs/common';
import { StageRepositoryService } from '../../../repository/stage/services/stage-repository.service';
import { CreateStageDTO } from '../../../../shared/dto/stage/create-stage.dto';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import { StageEntity } from '../../../repository/stage/entities/stage.entity';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class StageService 
{
    constructor(
        private readonly stageRepositoryService: StageRepositoryService,
    )
    {}

    async createStage(createStageDTO: CreateStageDTO, connectedUser: AuthUserEntity): Promise<StageEntity>
    {
        const stage = new StageEntity();
        return this.stageRepositoryService.saveStage(stage);
    }

    async attachImageToStage(stage: StageEntity, imageOriginalname: string, imageMimetype: string): Promise<StageEntity>
    {
        stage.imageFilename=imageOriginalname;
        stage.mimeType=imageMimetype;
        return await this.stageRepositoryService.saveStage(stage);
    }
}
