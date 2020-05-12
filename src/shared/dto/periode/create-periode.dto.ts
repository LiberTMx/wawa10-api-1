export class CreatePeriodeDTO
{
    id: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    isForEntrainements: boolean;
    isForStages: boolean;
}
