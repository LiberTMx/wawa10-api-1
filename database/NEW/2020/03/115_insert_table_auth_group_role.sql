
insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where group_='admin'),
    (select id from auth_role where role='admin'
        and domain_id=(select id from auth_domain where domain='club')
    )
);

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where group_='admin'),
    (select id from auth_role where role='admin'
        and domain_id=(select id from auth_domain where domain='stage')
    )
);

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where group_='admin'),
    (select id from auth_role where role='admin'
        and domain_id=(select id from auth_domain where domain='entrainement')
    )
);