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
@Entity({name: 'aftt_match_type'})
export class AfttMatchTypeEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'match_type'})
    matchType: number;

    @Column({name: 'comment'})
    comment: string;

    @Column({name: 'supported_by_club'})
    supportedByClub: boolean;
}
