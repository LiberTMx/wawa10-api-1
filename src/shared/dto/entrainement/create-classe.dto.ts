
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
export class CreateClasseDTO {

    /*
    const postData = new FormData();
        postData.append('title' , classeFormValue.title );
        postData.append('presentation' , classeFormValue.presentation );
        postData.append('status' , classeFormValue.status );
        postData.append('externalLink' , classeFormValue.externalLink );
        postData.append('showOrder' , classeFormValue.showOrder );
        postData.append('avatar' , classeFormValue.avatar );
        postData.append('image' , classeFormValue.image );
    */
    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'title is too short. Minimal length is $constraint1 characters, but actual is $value' })
    titre: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'presentation is too short. Minimal length is $constraint1 characters, but actual is $value' })
    presentation: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'status is too short. Minimal length is $constraint1 characters, but actual is $value' })
    status: ClasseStatusType;

    externalLink: string;

    showOrder: number;

    imageFilename: string;
    mimeType: string;
    updatedAt: Date;
    updatedBy: string;

}
