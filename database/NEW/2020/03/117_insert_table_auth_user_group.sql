
insert into auth_user_group(user_id, group_id) 
values
(
    (select id from auth_user where username='guy'),
    (select id from auth_group where group_='admin')
);

