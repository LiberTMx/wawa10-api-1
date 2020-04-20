import { MinLength, IsInt, IsNotEmpty } from 'class-validator';

export class AuthDomainModel
{
    @MinLength(5, { // here, $constraint1 will be replaced with "1", and $value with actual supplied value
    message: 'Le nom du domaine est trop court. La longueur minimale est de $constraint1 caractères, mais la longuer actuelle est $value' })
    domainName: string;

    domainCommentaire: string;

    @IsInt()
    @IsNotEmpty()
    showOrdre: number;
}
