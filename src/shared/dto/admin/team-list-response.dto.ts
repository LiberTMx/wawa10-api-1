export class AfttTeamModel
{
    /*
    "TeamId":"4597-8",
    "Team":"",
    "DivisionId":4597,
    "DivisionName":"Beker van Belg vr 2 - National - Hommes",
    "DivisionCategory":1,
    "MatchType":5},
    */

   TeamId: string;
   Team: string;
   DivisionId: number;
   DivisionName: string;
   DivisionCategory: number;
   MatchType: number;
}

export class AfttClubTeamModel
{
    ClubName: string;
    TeamCount: number;
    TeamEntries: AfttTeamModel[];
}

export class TeamListResponse
{
    data: AfttClubTeamModel;
    err: any;
}
