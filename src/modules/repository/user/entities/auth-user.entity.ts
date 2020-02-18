import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { AuthUserGroupEntity } from './auth-user-group.entity';

@Entity({name: 'auth_user'})
export class AuthUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'nom'})
    nom: string;

    @Column({name: 'prenom'})
    prenom: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'must_change_password'})
    mustChangePassword: boolean;

    //@Column({name: 'enabled'})
    //enabled: boolean;

    //@OneToOne((type) => AuthUserGroupEntity, (authUserGroupEntity) => authUserGroupEntity.authUser)
    //authUserGroup: AuthUserGroupEntity;

}
