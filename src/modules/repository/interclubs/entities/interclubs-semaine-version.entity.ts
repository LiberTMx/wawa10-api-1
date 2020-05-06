import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({name: 'interclubs_semaine_version'})
export class InterclubsSemaineVersionEntity
{
    //id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'semaine_id'})
    // tslint:disable-next-line:variable-name
    semaine_id: number; // tinyint(2) unsigned NOT NULL,  -- FK
    
    @Column({name: 'semaine_version'})
    // tslint:disable-next-line:variable-name
    semaine_version: number; // int,

    @Column({name: 'semaine_version_statut'})
    // tslint:disable-next-line:variable-name
    semaine_version_statut: string; // varchar(5),
}
