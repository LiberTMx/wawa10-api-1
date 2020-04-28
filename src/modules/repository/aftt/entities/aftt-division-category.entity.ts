import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// tslint:disable
@Entity({name: 'aftt_division_category'})
export class AfttDivisionCategoryEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /*
        Attention !
        Ici on n'utilise pas le 'name mapping' pour respecter la convention camel-case des noms de champ!
        Ceci parce que lors du parsing des données en retour du service soap de l'AFTT, on utilise
        object.assign qui est case sensitive !

    */
   
    @Column()
    classementcategory: number;

    @Column()
    playercategory: number;

    @Column()
    division_name_prefix: string;

    @Column()
    first_season: number;

    @Column()
    last_season: number;

    @Column()
    order: number;
}
