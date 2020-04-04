import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

/*
  {"Position":1,"UniqueIndex":119894,"RankingIndex":1,
          "FirstName":"JULIEN","LastName":"INDEHERBERG","Ranking":"A20","Status":"A","Gender":"M",
          "Category":"SEN","MedicalAttestation":true},

*/
@Entity({name: 'aftt_member_by_category'})
export class AfttMemberByCategoryEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'aftt_LastSyncId'})
    // tslint:disable-next-line:variable-name
    aftt_LastSyncId: number;
    @Column({name: 'division_category'})
    divisionCategory: number;

    @Column()
    Position: number;
    @Column()
    UniqueIndex: number;
    @Column()
    RankingIndex: number;
    @Column()
    FirstName: string;
    @Column()
    LastName: string;
    @Column()
    Ranking: string;
    @Column()
    Status: string;
    @Column()
    Gender: string;
    @Column()
    Category: string;
    @Column()
    MedicalAttestation: boolean;

}
