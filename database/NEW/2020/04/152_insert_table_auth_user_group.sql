
insert into auth_user_group(user_id, group_id) 
values
(
    (select id from auth_user where username='guy'),
    (select id from auth_group where name='club_membre')
);

insert into auth_user_group(user_id, group_id) 
values
(
    (select id from auth_user where username='liberm'),
    (select id from auth_group where name='club_membre')
);
