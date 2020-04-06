import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'aftt_week_by_category'})
export class AfttWeekByCategory
{
    //id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    //aftt_LastSyncId int not null, -- FK
    @Column({name: 'aftt_LastSyncId'})
    lastSyncId: number;

    @Column({name: 'division_category_id'})
    divisionCategoryId: number; // tinyint(2) unsigned NOT NULL,  -- FK
    
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
