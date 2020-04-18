import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity({name: 'auth_fonction'})
export class AuthFonctionEntity 
{
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  designation: string;

  @Column()
  description: string;
} 
