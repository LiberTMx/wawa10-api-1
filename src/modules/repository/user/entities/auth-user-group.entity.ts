import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AuthGroupEntity } from './auth-group.entity';
import { AuthUserEntity } from './auth-user.entity';

@Entity({name: 'auth_user_group'})
export class AuthUserGroupEntity {

    @PrimaryColumn()
    id: number;

    @Column({name: 'user_id'})
    authUserId: number;

    @Column({name: 'group_id'})
    authGroupId: number;

    /*
    @OneToOne(type => AuthGroupEntity)
    @JoinColumn({name: 'auth_group_id'})
    authGroup: AuthGroupEntity;

    @OneToOne((type) => AuthUserEntity, (authUserEntity) => authUserEntity.authUserGroup)
    @JoinColumn({name: 'auth_user_id'})
    authUser: AuthUserEntity;
    */
}
