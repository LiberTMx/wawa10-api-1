import { Injectable } from '@nestjs/common';
import { CreateClasseDTO } from '../../../../shared/dto/entrainement/create-classe.dto';
import { AuthUserEntity } from '../../../repository/user/entities/auth-user.entity';
import { EntrainementClasseEntity } from '../../../repository/entrainement/entities/entrainement-classe.entity';
import { EntrainementRepositoryService } from '../../../repository/entrainement/services/entrainement-repository/entrainement-repository.service';
import { EntrainementClasseGroupeEntity } from '../../../repository/entrainement/entities/entrainement-classe-groupe.entity';
import { CreateClasseGroupeDTO } from '../../../../shared/dto/entrainement/create-classe-groupe.dto';
import { CreateGroupeSeanceDTO } from '../../../../shared/dto/entrainement/create-groupe-seance.dto';
import { EntrainementGroupeSeanceEntity } from '../../../repository/entrainement/entities/entrainement-groupe-seance.entity';

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

    async createClasseGroupe(createClasseGroupeDTO: CreateClasseGroupeDTO, connectedUser: AuthUserEntity): Promise<EntrainementClasseGroupeEntity>
    {
        const groupe: EntrainementClasseGroupeEntity =  new EntrainementClasseGroupeEntity();
        Object.assign(groupe, createClasseGroupeDTO);
        groupe.updatedAt=new Date();
        groupe.updatedBy=connectedUser.username;
        return await this.entrainementRepositoryService.saveClasseGroupe(groupe);
    }

    async attachImageToClasse(classe: EntrainementClasseEntity, imageOriginalname: string, imageMimetype: string): Promise<EntrainementClasseEntity>
    {
        classe.imageFilename=imageOriginalname;
        classe.mimeType=imageMimetype;
        return await this.entrainementRepositoryService.saveClasse(classe);
    }

    async attachImageToClasseGroupe(groupe: EntrainementClasseGroupeEntity, imageOriginalname: string, imageMimetype: string): Promise<EntrainementClasseGroupeEntity>
    {
        groupe.imageFilename=imageOriginalname;
        groupe.mimeType=imageMimetype;
        return await this.entrainementRepositoryService.saveClasseGroupe(groupe);
    }

    async getEntrainementClasses(all: boolean): Promise< EntrainementClasseEntity[] >
    {
        return await this.entrainementRepositoryService.getEntrainementClasses(all);
    }

    async getEntrainementClasseById(classeId: number): Promise< EntrainementClasseEntity >
    {
        return await this.entrainementRepositoryService.getEntrainementClasseById(classeId);
    }

    async getEntrainementClasseGroupes(classeId: number): Promise<EntrainementClasseGroupeEntity[]>
    {
        return await this.entrainementRepositoryService.getEntrainementClasseGroupes(classeId);   
    }

    async createGroupeSeance(createGroupeSeanceDTO: CreateGroupeSeanceDTO, connectedUser: AuthUserEntity): Promise<EntrainementGroupeSeanceEntity>
    {
        const seance: EntrainementGroupeSeanceEntity =  new EntrainementGroupeSeanceEntity();
        Object.assign(seance, createGroupeSeanceDTO);
        seance.updatedAt=new Date();
        seance.updatedBy=connectedUser.username;
        return await this.entrainementRepositoryService.saveGroupeSeance(seance);
    }

    async getEntrainementGroupeSeances(groupeId: number): Promise<EntrainementGroupeSeanceEntity[]>
    {
        return await this.entrainementRepositoryService.getEntrainementGroupeSeances(groupeId);
    }
}
