import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name: 'auth_user_fonctions_auth_fonction'})
export class AuthUserFonctionEntity {

    @PrimaryColumn()
    id: number;

    @Column({name: 'authUserId'})
    authUserID: number;

    @Column({name: 'authFonctionId'})
    fonctionID: number;
}
