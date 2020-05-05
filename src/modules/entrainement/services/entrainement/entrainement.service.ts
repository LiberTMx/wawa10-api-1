import { Injectable } from '@nestjs/common';
import { CreateClasseDTO } from '../../../../shared/dto/entrainement/create-classe.dto';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import { EntrainementClasseEntity } from '../../../repository/entrainement/entities/entrainement-classe.entity';
import { EntrainementRepositoryService } from '../../../repository/entrainement/services/entrainement-repository/entrainement-repository.service';

@Injectable()
export class EntrainementService 
{
    constructor(
        private readonly entrainementRepositoryService: EntrainementRepositoryService,
    ){}

    async createClasse(createClasseDTO: CreateClasseDTO, connectedUser: AuthUserEntity): Promise<EntrainementClasseEntity>
    {
        const classe: EntrainementClasseEntity =  new EntrainementClasseEntity();
        Object.assign(classe, createClasseDTO);
        classe.updatedAt=new Date();
        classe.updatedBy=connectedUser.username;
        return await this.entrainementRepositoryService.saveClasse(classe);
    }

    async attachImageToClasse(classe: EntrainementClasseEntity, imageOriginalname: string, imageMimetype: string): Promise<EntrainementClasseEntity>
    {
        classe.imageFilename=imageOriginalname;
        classe.mimeType=imageMimetype;
        return await this.entrainementRepositoryService.saveClasse(classe);
    }

    async getEntrainementClasses(all: boolean): Promise< EntrainementClasseEntity[] >
    {
        return await this.entrainementRepositoryService.getEntrainementClasses(all);
    }
}
