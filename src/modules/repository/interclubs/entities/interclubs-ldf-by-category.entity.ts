import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'interclubs_ldf_by_category'})
export class InterclubsLdfByCategoryEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'participant_id'})
    participantId: number; //int not null,

    @Column({name: 'player_category'})
    playerCategory: number; // int(11) not null,

    @Column({name: 'position'})
    position: number; // int not null,

    @Column({name: 'classement'})
    classement: string; // varchar(20) not null,

    @Column({name: 'ranking_index'})
    rankingIndex: number; // int not null,

}  
