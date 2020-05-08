import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({name: 'periode'})
export class PeriodeEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nom'})
    nom: string;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'date_debut'})
    dateDebut: Date;

    @Column({name: 'date_fin'})
    dateFin: Date;

    @Column({name: 'is_for_entrainements'})
    isForEntrainements: boolean;

    @Column({name: 'is_for_stages'})
    isForStages: boolean;

    @Column({name: 'updated_at'})
    updatedAt: Date;

    @Column({name: 'updated_by'})
    updatedBy: string;
}
