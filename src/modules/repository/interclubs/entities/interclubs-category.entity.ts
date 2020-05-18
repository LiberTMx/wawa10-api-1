import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({name: 'interclubs_category'})

export class InterclubsCategoryEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({name: 'classementcategory'})
    classementCategory: number;

    @Column({name: 'playercategory'})
    playerCategory: number;

    @Column({name: 'division_name_prefix'})
    divisionNamePrefix: string;

    @Column({name: 'first_season'})
    firstSeason: number;

    @Column({name: 'last_season'})
    lastSeason: number;

    @Column()
    order: number;

    @Column()
    synonyme: string;
}
