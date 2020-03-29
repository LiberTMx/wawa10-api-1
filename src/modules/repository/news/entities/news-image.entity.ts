import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { NewsEntity } from './news.entity';

@Entity({name: 'news_image'})
export class NewsImageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'news_id'})
    newsId: number;

    @Column({name: 'image_filename'})
    imageFilename: string;

    @Column({name: 'mime_type'})
    mimeType: string;

    @OneToOne(type => NewsEntity)
    @JoinColumn({ name: 'news_id' })
    news: NewsEntity;
}
