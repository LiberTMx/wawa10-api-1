import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { InterclubsDivisionEntity } from './interclubs-division.entity';

@Entity({name: 'interclubs_match'})
export class InterclubsMatchEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'match_id'})
    MatchId: string;

    @Column({name: 'week_name'})
    WeekName: string;

    @Column({name: 'match_date'})
    matchDate: Date;

    @Column({name: 'match_time'})
    Time: string;

    @Column({name: 'venue_number'})
    Venue: number;

    @Column({name: 'HomeClub'})
    HomeClub: string;

    @Column({name: 'HomeTeam'})
    HomeTeam: string;

    @Column({name: 'AwayClub'})
    AwayClub: string;

    @Column({name: 'AwayTeam'})
    AwayTeam: string;

    @Column({name: 'Score'})
    Score: string;

    @Column({name: 'MatchUniqueId'})
    MatchUniqueId: number;

    @Column({name: 'IsHomeForfeited'})
    IsHomeForfeited: boolean;

    @Column({name: 'IsAwayForfeited'})
    IsAwayForfeited: boolean;

    @Column({name: 'DivisionId'})
    DivisionId: number;

    @Column({name: 'DivisionCategory'})
    DivisionCategory: string;

    @Column({name: 'IsHomeWithdrawn'})
    IsHomeWithdrawn: string;

    @Column({name: 'IsAwayWithdrawn'})
    IsAwayWithdrawn: string;

    // VENUE
    @Column({name: 'venue_name'})
    venueName: string;

    @Column({name: 'venue_street'})
    venueStreet: string;

    @Column({name: 'venue_town'})
    venueTown: string;

    @Column({name: 'venue_phone'})
    venuePhone: string;

    @Column({name: 'venue_comment'})
    venueComment: string;

    @Column({name: 'is_validated'})
    IsValidated: boolean;

    @Column({name: 'is_locked'})
    IsLocked: boolean;

    @Column({name: 'homeTeamId'})
    homeTeamId: string;

    @Column({name: 'awayTeamId'})
    awayTeamId: string;

    
    @OneToOne(type => InterclubsDivisionEntity, division => division.DivisionId)
    @JoinColumn({ name: 'DivisionId' })
    division: InterclubsDivisionEntity;
    

    /*
    @OneToOne(type => InterclubsDivisionEntity, division => division.DivisionId) // specify inverse side as a second parameter
    division: InterclubsDivisionEntity;
    */

}
