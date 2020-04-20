delete from auth_role
WHERE role <> 'admin';

insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'membre');

insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='stage'), 'participant');

insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='entrainement'), 'participant');
    