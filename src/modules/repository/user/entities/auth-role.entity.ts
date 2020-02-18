import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AuthGroupRoleEntity } from './auth-group-role.entity';

@Entity({name: 'auth_role'})
export class AuthRoleEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => AuthGroupRoleEntity, authGroupRoleEntity => authGroupRoleEntity.authRole)
    authGroupRole: AuthGroupRoleEntity[];

}
