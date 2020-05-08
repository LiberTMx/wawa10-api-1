
import { IsEmail, MinLength } from 'class-validator';
import { ClasseStatusType } from '../../../modules/entrainement/types/classe-status.enum';

/*
      id
      , username
      , firstname
      , lastname
      , password
      , email
      , role_id
      , enabled
*/
export class CreateClasseGroupeDTO {

    /*
    postData.append('classeId' , String(classeId) );
        postData.append('titre' , groupeFormValue.titre );
        postData.append('presentation' , groupeFormValue.presentation );
        postData.append('status' , groupeFormValue.status );
        postData.append('limiteAge' , groupeFormValue.externalLink );
        postData.append('limiteClassement' , groupeFormValue.externalLink );
        postData.append('showOrder' , groupeFormValue.showOrder );
        postData.append('avatar' , groupeFormValue.avatar );
        postData.append('image' , groupeFormValue.image );
    */

    classeId: number;

    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'title is too short. Minimal length is $constraint1 characters, but actual is $value' })
    titre: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'presentation is too short. Minimal length is $constraint1 characters, but actual is $value' })
    presentation: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'status is too short. Minimal length is $constraint1 characters, but actual is $value' })
    status: ClasseStatusType;

    limiteAge: string;
    limiteClassement: string;
    showOrder: number;
    imageFilename: string;
    mimeType: string;
    updatedAt: Date;
    updatedBy: string;

    periodeId: number;
}
