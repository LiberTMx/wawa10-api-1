export class LdfParticipantDTO
{
    participant: any;
    
    id: number;
    nom: string;//  varchar(255) DEFAULT NULL,
    prenom: string; // varchar(255) DEFAULT NULL,
    sexe: string; // varchar(1) DEFAULT NULL,
    licence: string; // varchar(25) not null,
    authUserId: number; // int,
    statut: string; // varchar(10),
    playerCategory: string; // varchar(3) not null,
    medicalAttestation: boolean;// TINYINT(1),
}
