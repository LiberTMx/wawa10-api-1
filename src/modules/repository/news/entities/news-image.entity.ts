import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'news_image'})
export class NewsImageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'news_id'})
    newsId: number;

    @Column({name: 'doc_filename'})
    imageFilename: string;

}
