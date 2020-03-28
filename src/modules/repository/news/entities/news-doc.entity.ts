
/*
id INT NOT NULL AUTO_INCREMENT,
news_id int not null,
doc_filename varchar(255) NOT NULL,
*/

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({name: 'news_doc'})
export class NewsDocEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'news_id'})
    newsId: number;

    @Column({name: 'doc_filename'})
    docFilename: string;

}
