import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'aftt_all_data'})
export class AfttAllDataEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by_id'})
    createdById: number;

    @Column({name: 'teams_data'})
    teams: string;

    @Column({name: 'divisions_data'})
    divisions: string;

    @Column({name: 'matches_data'})
    matches: string;

    @Column({name: 'membres_data'})
    membres: string;
}
