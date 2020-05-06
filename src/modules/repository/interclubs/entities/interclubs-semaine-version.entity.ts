import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({name: 'interclubs_semaine_version'})
export class InterclubsSemaineVersionEntity
{
    //id INT NOT NULL AUTO_INCREMENT ,
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'semaine_id'})
    semaineId: number; 
    
    @Column({name: 'semaine_version'})
    semaineVersion: number; 

    @Column({name: 'semaine_version_statut'})
    semaineVersionStatut: string;

}

