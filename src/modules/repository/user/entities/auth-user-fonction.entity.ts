import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name: 'auth_user_fonction'})
export class AuthUserFonctionEntity {

    @PrimaryColumn()
    id: number;

    @Column({name: 'auth_user_id'})
    authUserID: number;

    @Column({name: 'fonction_id'})
    fonctionID: number;
}
