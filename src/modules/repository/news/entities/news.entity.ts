import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { NewsImageEntity } from './news-image.entity';
import { NewsDocEntity } from './news-doc.entity';
import { NewsType } from '../../../news/types/news-status.enum';
import { AuthUserEntity } from '../../user/entities/auth-user.entity';

@Entity({name: 'news'})
export class NewsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'titre'})
    title: string;

    @Column()
    presentation: string;

    @Column({name: 'auteur_id'})
    auteurId: number;

    @Column({name: 'created_at'})
    createdAt: Date;
    
    @Column({name: 'updated_at'})
    updatedAt: Date;

    @Column({name: 'statut'})
    status: NewsType;

    @Column({name: 'external_link'})
    externalLink: string;

    @Column({name: 'show_order'})
    showOrder: number;

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
}
