import { MinLength, IsEmail } from 'class-validator';

export class MessageDTO
{
    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'firstname is too short. Minimal length is $constraint1 characters, but actual is $value' })
    name: string;

    @IsEmail()
    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'email is too short. Minimal length is $constraint1 characters, but actual is $value' })
    email: string;
    
    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'firstname is too short. Minimal length is $constraint1 characters, but actual is $value' })
    subject: string;

    @MinLength(1, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'firstname is too short. Minimal length is $constraint1 characters, but actual is $value' })
    message: string;
}
