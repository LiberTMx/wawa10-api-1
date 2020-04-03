import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'aftt_team'})
export class AfttTeamEntity
{
    // id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    // aftt_LastSyncId int not null,
    @Column({name: 'aftt_LastSyncId'})
    // tslint:disable-next-line:variable-name
    aftt_LastSyncId: number;

    //  TeamId varchar(255),
    @Column({name: 'TeamId'})
    TeamId: string;
 
    //  Team varchar(255),
    @Column({name: 'Team'})
    Team: string;

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
    @Column({name: 'MatchType'})
    MatchType: number;
}
