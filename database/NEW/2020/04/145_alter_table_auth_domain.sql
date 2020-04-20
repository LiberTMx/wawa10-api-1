ALTER TABLE
    auth_domain ADD
        (
            show_ordre int
         );

update auth_domain
set show_ordre = 999;

update auth_domain
set show_ordre = 100 where domain='club';

update auth_domain
set show_ordre = 200 where domain='entrainement';

update auth_domain
set show_ordre = 300 where domain='stage';

ALTER TABLE auth_domain MODIFY COLUMN show_ordre int NOT NULL DEFAULT 999;