
/*
id INT NOT NULL AUTO_INCREMENT,
news_id int not null,
doc_filename varchar(255) NOT NULL,
*/

import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { NewsEntity } from './news.entity';

@Entity({name: 'news_doc'})
export class NewsDocEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'news_id'})
    newsId: number;

    @Column({name: 'doc_filename'})
    docFilename: string;
    
    @Column({name: 'mime_type'})
    mimeType: string;

    @OneToOne(type => NewsEntity)
    @JoinColumn({ name: 'news_id' })
    news: NewsEntity;
}
