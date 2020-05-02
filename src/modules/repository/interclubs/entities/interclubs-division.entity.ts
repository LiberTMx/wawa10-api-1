import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// {"DivisionId":4141,"DivisionName":"Division 1A - National - Hommes","DivisionCategory":1,"Level":1,"MatchType":2},
@Entity({name: 'interclubs_division'})
export class InterclubsDivisionEntity
{
    // id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

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
