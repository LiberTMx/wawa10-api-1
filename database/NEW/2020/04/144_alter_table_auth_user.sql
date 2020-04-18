ALTER TABLE
    auth_user ADD
        (
            membre_comite tinyint(1) not null default 0
         );