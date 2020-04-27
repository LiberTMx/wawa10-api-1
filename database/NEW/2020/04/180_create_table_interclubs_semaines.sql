create table interclubs_semaine 
( 
    id int not null auto_increment,
    afft_division_category_id tinyint(2) unsigned NOT NULL,  -- FK
    week_name varchar(5),
    week_number int,
    year int,
    start_of_week date,
    end_of_week date,
    PRIMARY KEY  (id)
) 
;
