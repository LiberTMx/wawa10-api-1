import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { AuthUserGroupEntity } from './auth-user-group.entity';

@Entity({name: 'credential'})
export class CredentialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'credential'})
    credential: string;
}
