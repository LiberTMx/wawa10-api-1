import { MinLength } from 'class-validator';

export class AuthFonctionModel
{
    id: number;
    
    @MinLength(3, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'Le code de la fonction est trop court. La longueur minimale est de $constraint1 caractères, mais la longuer actuelle est $value' })
    code: string;
    
    @MinLength(5, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'La désignation de la fonction est trop courte. La longueur minimale est de $constraint1 caractères, mais la longuer actuelle est $value' })
    designation: string;
    
    description: string;
}
