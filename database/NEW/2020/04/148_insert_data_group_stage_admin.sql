insert into auth_group(name) values('stage_admin');

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where name='stage_admin'),
    (select id from auth_role where role='admin'
        and domain_id=(select id from auth_domain where domain='stage')
    )
);