export class WeekInfo
{
    /*
    const afttWeekName=match.WeekName;
    const r = weekMap.get(afttWeekName);
    const weekNumber=DateFNS.getWeek(match.matchDate);
    const year=DateFNS.getYear(match.matchDate);
    const startOfWeek=DateFNS.startOfWeek(match.matchDate, 1);
    const endOfWeek=DateFNS.endOfWeek(match.matchDate, 1);
    */

    constructor(
        public weekName: string,
        public weekNumber: number,
        public year: number,
        public startOfWeek: Date,
        public endOfWeek: Date,
    )
    {}              
}
