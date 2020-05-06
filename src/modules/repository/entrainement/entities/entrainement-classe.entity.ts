import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ClasseStatusType } from '../../../entrainement/types/classe-status.enum';

@Entity({ name: 'entrainement_classe'})
export class EntrainementClasseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'titre'})
    titre: string;

    @Column()
    presentation: string;

    @Column({name: 'updated_at'})
    updatedAt: Date;
    
    @Column({name: 'updated_by'})
    updatedBy: string;

    @Column({name: 'mime_type'})
    mimeType: string;

    @Column({name: 'image_filename'})
    imageFilename: string;

    @Column({name: 'statut'})
    status: ClasseStatusType;

    @Column({name: 'external_link'})
    externalLink: string;

    @Column({name: 'show_order'})
    showOrder: number;

    /*
    // image
    @OneToOne(type => NewsImageEntity, image => image.news, {onDelete:'CASCADE'}) // specify inverse side as a second parameter
    image: NewsImageEntity;

    // document
    @OneToOne(type => NewsDocEntity, document => document.news, {onDelete:'CASCADE'}) // specify inverse side as a second parameter
    document: NewsDocEntity;

    // document
    @OneToOne(type => AuthUserEntity)
    @JoinColumn({ name: 'auteur_id' })
    auteur: AuthUserEntity;
    */
}
