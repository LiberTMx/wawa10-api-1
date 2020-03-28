
import { IsEmail, MinLength } from 'class-validator';

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
export class CreateNewsDTO {

    /*
    postData.append('title' , newsFormValue.title );
    postData.append('presentation' , newsFormValue.presentation );
    postData.append('status' , newsFormValue.status );
    postData.append('externalLink' , newsFormValue.externalLink );
    postData.append('showOrder' , newsFormValue.showOrder );
    postData.append('avatar' , newsFormValue.avatar );
    postData.append('pdf' , newsFormValue.pdf );
    postData.append('image' , newsFormValue.image );
    postData.append('avatarPdf' , newsFormValue.avatarPdf );
    */
    @MinLength(5, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'title is too short. Minimal length is $constraint1 characters, but actual is $value' })
    title: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'presentation is too short. Minimal length is $constraint1 characters, but actual is $value' })
    presentation: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'status is too short. Minimal length is $constraint1 characters, but actual is $value' })
    status: string;

    externalLink: string;

    showOrder: number;

    pdf: string;

    image: string;

    auteurId: number;
}
