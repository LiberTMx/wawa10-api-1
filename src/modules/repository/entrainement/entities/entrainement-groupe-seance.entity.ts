import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'entrainement_groupe_seance'})
export class EntrainementGroupeSeanceEntity
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

    @Column({name: 'jour_index'})
    jourIndex: number;

    @Column({name: 'heure_debut'})
    heureDebut: string;

    @Column({name: 'heure_fin'})
    heureFin: string;

    @Column({name: 'groupe_id'})
    groupeId: number;

    @Column({name: 'classe_id'})
    classeId: number;
}
