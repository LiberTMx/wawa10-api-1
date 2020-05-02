
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'interclubs_ldf_participant'})
export class InterclubsLdfParticipantEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nom'})
    nom: string;//  varchar(255) DEFAULT NULL,

    @Column({name: 'prenom'})
    prenom: string; // varchar(255) DEFAULT NULL,

    @Column({name: 'sexe'})
    sexe: string; // varchar(1) DEFAULT NULL,

    @Column({name: 'licence'})
    licence: string; // varchar(25) not null,

    @Column({name: 'auth_user_id'})
    authUserId: number; // int,

    @Column({name: 'statut'})
    statut: string; // varchar(10),

    @Column({name: 'player_category'})
    playerCategory: string; // varchar(3) not null,

    @Column({name: 'medical_attestation'})
    medicalAttestation: boolean;// TINYINT(1),

}
