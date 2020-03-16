
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'admin');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'comite');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'president');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'secretaire');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'tresorier');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'secretaire_adjoint');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='club'), 'tresorier_adjoint');

insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='stage'), 'admin');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='stage'), 'participant');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='stage'), 'entraineur');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='stage'), 'sparring');

insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='entrainement'), 'admin');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='entrainement'), 'entraineur');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='entrainement'), 'sparring');
insert into auth_role( domain_id, role) 
    values((select id from auth_domain where domain='entrainement'), 'participant');