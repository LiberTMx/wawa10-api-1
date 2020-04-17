import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({name: 'parametre'})
export class ParametreEntity
{
    @PrimaryGeneratedColumn()
    id: number; // INT NOT NULL AUTO_INCREMENT ,

    @Column({name: 'param_key'})
    paramKey: string; // VARCHAR(60) NOT NULL ,

    @Column({name: 'param_value'})
    paramValue: string; //  VARCHAR(100) NOT NULL ,

    @Column({name: 'param_type'})
    paramType: string; //  VARCHAR(100) NOT NULL ,

    @Column({name: 'param_format'})
    paramFormat: string; //  VARCHAR(100) 
}
