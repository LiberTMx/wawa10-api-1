ALTER TABLE
    auth_user ADD
        (
            gestion_parentale tinyint(1) not null default 0
         );

ALTER TABLE
    auth_user ADD
        (
            comment_comite text
         );   

ALTER TABLE
    auth_user ADD
        (
            is_stage_participant_discret tinyint(1) not null default 0
         );               