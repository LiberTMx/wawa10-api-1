insert into auth_group(name) values('club_membre');

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where name='club_membre'),
    (select id from auth_role where role='membre'
        and domain_id=(select id from auth_domain where domain='club')
    )
);

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where name='club_membre'),
    (select id from auth_role where role='participant'
        and domain_id=(select id from auth_domain where domain='stage')
    )
);

insert into auth_group_role(group_id, role_id) 
values
(
    (select id from auth_group where name='club_membre'),
    (select id from auth_role where role='participant'
        and domain_id=(select id from auth_domain where domain='entrainement')
    )
);