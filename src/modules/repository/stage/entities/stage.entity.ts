import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'stage'})
export class StageEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'mime_type'})
    mimeType: string;

    @Column({name: 'image_filename'})
    imageFilename: string;
    
}
