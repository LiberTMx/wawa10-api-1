ALTER TABLE
    auth_domain ADD
        (
            activity varchar(10) default null
         );

update auth_domain
set activity='E' where domain='entrainement';

update auth_domain
set activity='S' where domain='stage';     