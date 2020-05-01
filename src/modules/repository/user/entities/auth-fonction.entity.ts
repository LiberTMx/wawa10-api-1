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

  @Column({name: 'membre_comite'})
  membreComite: boolean;

  @Column()
  deletable: boolean;

  @Column({name: 'ordre_affichage'})
  ordreAffichage: number;

} 
