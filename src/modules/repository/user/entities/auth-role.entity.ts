import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AuthDomainEntity } from './auth-domain.entity';

@Entity({name: 'auth_role'})
export class AuthRoleEntity {

    @PrimaryColumn()
    id: number;

    @Column()
    role: string;

    @OneToOne(type => AuthDomainEntity)
    @JoinColumn({name: 'domain_id'})
    authDomain: AuthDomainEntity;
}
