import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'aftt_division_category'})
export class AfttDivisionCategoryEntity
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    classementcategory: number;
    @Column()
    playercategory: number;
    @Column()
    // tslint:disable-next-line:variable-name
    division_name_prefix: string;
    @Column()
    // tslint:disable-next-line:variable-name
    first_season: number;
    @Column()
    // tslint:disable-next-line:variable-name
    last_season: number;
    @Column()
    order: number;
}
