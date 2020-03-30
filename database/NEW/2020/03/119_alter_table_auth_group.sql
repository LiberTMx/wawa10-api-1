-- use eoycwjpsite2;

ALTER TABLE
    auth_group ADD
        (commentaire varchar(1000) default null );

ALTER TABLE auth_group
CHANGE COLUMN group_ name VARCHAR(255) NOT NULL ;
