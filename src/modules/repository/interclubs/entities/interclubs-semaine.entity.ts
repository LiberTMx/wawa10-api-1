import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name: 'interclubs_semaine'})
export class InterclubsSemaineEntity
{
    //id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'afft_division_category_id'})
    afftDivisionCategoryId: number; // tinyint(2) unsigned NOT NULL,  -- FK
    
    @Column({name: 'week_name'})
    weekName: string; // varchar(5),

    @Column({name: 'week_number'})
    weekNumber: number; // int,

    @Column({name: 'year'})
    year: number; // int,

    @Column({name: 'start_of_week'})
    startOfWeek: Date; // date,

    @Column({name: 'end_of_week'})
    endOfWeek: Date; // date,
}