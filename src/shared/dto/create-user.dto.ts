
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
export class CreateUserDTO {

    @MinLength(5, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'username is too short. Minimal length is $constraint1 characters, but actual is $value' })
    username: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'firstname is too short. Minimal length is $constraint1 characters, but actual is $value' })
    nom: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'lastname is too short. Minimal length is $constraint1 characters, but actual is $value' })
    prenom: string;

    @MinLength(5, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'password is too short. Minimal length is $constraint1 characters, but actual is $value' })
    password: string;

    @IsEmail()
    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'email is too short. Minimal length is $constraint1 characters, but actual is $value' })
    email: string;

    /*
    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'role is too short. Minimal length is $constraint1 characters, but actual is $value' })
    group: string;
    */
}
