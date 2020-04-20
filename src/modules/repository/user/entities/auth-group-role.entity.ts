import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne } from 'typeorm';
import { AuthGroupEntity } from './auth-group.entity';
import { AuthRoleEntity } from './auth-role.entity';

@Entity({name: 'auth_group_role'})
export class AuthGroupRoleEntity {

    @PrimaryColumn()
    id: number;

    @Column({name: 'group_id'})
    authGroupId: number;

    @Column({name: 'role_id'})
    authRoleId: number;

    @ManyToOne(type => AuthGroupEntity, authGroupEntity => authGroupEntity.authGroupRole)
    @JoinColumn({name: 'group_id'})
    authGroup: AuthGroupEntity;

    /*
    @ManyToOne(type => AuthRoleEntity, authRoleEntity => authRoleEntity.authGroupRole)
    @JoinColumn({name: 'auth_role_id'})
    authRole: AuthRoleEntity;
    */

    @OneToOne(type => AuthRoleEntity)
    @JoinColumn({name: 'role_id'})
    authRoleName: AuthRoleEntity;

}
