
ALTER TABLE
    auth_fonction ADD
        (
            membre_comite tinyint(1) not null default 0,
            deletable tinyint(1) not null default 1,
            ordre_affichage int not null default 100
         );

ALTER TABLE auth_fonction 
	ADD UNIQUE INDEX auth_fonction_code_uix (code asc);