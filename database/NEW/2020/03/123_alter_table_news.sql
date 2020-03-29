
ALTER TABLE
    news ADD
        (statut varchar(10) );

ALTER TABLE
    news ADD
        (external_link varchar(500) );

ALTER TABLE
    news ADD
        (show_order int );


ALTER TABLE
    news_doc ADD
        (mime_type varchar(50) );

ALTER TABLE
    news_image ADD
        (mime_type varchar(50) );