import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { AuthUserGroupEntity } from './auth-user-group.entity';

@Entity({name: 'auth_user'})
export class AuthUserEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'nom'})
    nom: string;

    @Column({name: 'prenom'})
    prenom: string;

    @Column({name: 'sexe'})
    sexe: string;

    @Column({name: 'date_naissance'})
    dateNaissance: Date;

    @Column({name: 'rue'})
    rue: string;

    @Column({name: 'numero'})
    numero: string;

    @Column({name: 'boite'})
    boite: string;

    @Column({name: 'code_postal'})
    codePostal: string;

    @Column({name: 'localite'})
    localite: string;

    @Column({name: 'num_tel'})
    numTel: string;

    @Column({name: 'num_tel_priv'})
    numTelPrive: string;

    @Column({name: 'num_mobile'})
    numMobile: string;

    @Column({name: 'licence'})
    licence: string;

    @Column({name: 'classt_h'})
    classementMessieur: string;

    @Column({name: 'classt_d'})
    classementDame: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'updated_at'})
    updateddAt: Date;

    @Column({name: 'comment'})
    comment: string;

    @Column({name: 'photo'})
    photo: string;

    @Column({name: 'deleted_at'})
    deletedAt: Date;

    @Column({name: 'notify_parents'})
    notifyParents: boolean;

    @Column({name: 'must_change_password'})
    mustChangePassword: boolean;

    @Column({name: 'init_credential'})
    initCredential: boolean;

    @Column({name: 'last_login_at'})
    lastLoginAt: Date;

    @Column({name:'change_password_jeton'})
    changePasswordJeton: string;
    //@Column({name: 'enabled'})
    //enabled: boolean;

    //@OneToOne((type) => AuthUserGroupEntity, (authUserGroupEntity) => authUserGroupEntity.authUser)
    //authUserGroup: AuthUserGroupEntity;

/*     @Column({name: 'password', select: false})
    password: string; */

    @Column({name: 'password'})
    password: string;

}
