import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// {"DivisionId":4141,"DivisionName":"Division 1A - National - Hommes","DivisionCategory":1,"Level":1,"MatchType":2},
@Entity({name: 'aftt_division'})
export class AfttDivisionEntity
{
    // id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    // aftt_LastSyncId int not null,
    @Column({name: 'aftt_LastSyncId'})
    // tslint:disable-next-line:variable-name
    aftt_LastSyncId: number;

    //DivisionId int not null,
    @Column({name: 'DivisionId'})
    DivisionId: number;

    //DivisionName varchar(255),
    @Column({name: 'DivisionName'})
    DivisionName: string;

    //DivisionCategory int,
    @Column({name: 'DivisionCategory'})
    DivisionCategory: number;

    //MatchType int,
    @Column({name: 'Level'})
    Level: number;
    
    //MatchType int,
    @Column({name: 'MatchType'})
    MatchType: number;
}
