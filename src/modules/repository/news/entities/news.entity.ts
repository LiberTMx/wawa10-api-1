import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    status: string;

    @Column({name: 'external_link'})
    externalLink: string;

    @Column({name: 'show_order'})
    showOrder: number;
}
