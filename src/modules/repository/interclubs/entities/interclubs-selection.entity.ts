import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'interclubs_selection'})
export class InterclubsSelectionEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'interclubs_match_id'})
    interclubs_match_id : string;

    @Column({name: 'auth_user_id'})
    auth_user_id: number; 

    @Column({name: 'interclubs_semaine_version_id'})
    interclubs_semaine_version_id: number;

    @Column({name: 'position'})
    position: number;

    @Column({name: 'classement'})
    classement: string;

    @Column({name: 'ranking_index'})
    ranking_index: number;

    @Column({name: 'joueur_confirmation'})
    joueur_confirmation: string;

    @Column({name: 'joueur_commentaire'})
    joueur_commentaire: string;

    @Column({name: 'updated_at'})
    updated_at: Date;

    @Column({name: 'updated_by'})
    updated_by: number;

}
