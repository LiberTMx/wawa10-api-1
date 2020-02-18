import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AuthGroupRoleEntity } from './auth-group-role.entity';

@Entity({name: 'auth_group'})
export class AuthGroupEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => AuthGroupRoleEntity, authGroupEntity => authGroupEntity.authGroup)
    authGroupRole: AuthGroupRoleEntity[];
}
