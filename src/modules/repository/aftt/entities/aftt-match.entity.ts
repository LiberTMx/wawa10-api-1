import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// {"MatchId":"BVB01/553","WeekName":"01",
// "Date":"2019-11-17T00:00:00.000Z","Time":"17:00:00",
// "Venue":1,"HomeClub":"H290","HomeTeam":"Bon-Secours","AwayClub":"BBW123","AwayTeam":"Limal Wavre",
// "Score":"4-1","MatchUniqueId":426811,"IsHomeForfeited":false,
// "IsAwayForfeited":false,"DivisionId":4597,"DivisionCategory":1,"IsHomeWithdrawn":"N","IsAwayWithdrawn":"N",
// "VenueClub":"H290",
// "VenueEntry":
//      {"Name":"SALLE COMMUNALE DE LA VERTE CHASSE","Street":"RUE DE LA VERTE CHASSE",
//          "Town":"7600 PERUWELZ","Phone":"32499520930","Comment":""
//      },
//  "IsValidated":true,"IsLocked":true}
@Entity({name: 'aftt_match'})
export class AfttMatchEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'aftt_LastSyncId'})
    // tslint:disable-next-line:variable-name
    aftt_LastSyncId: number;

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
}
