select concat(
'insert into auth_user (
username, nom, prenom, password, sexe, date_naissance
, rue, numero, boite, code_postal, localite, num_tel, num_mobile, num_tel_priv,licence
, classt_h, classt_d, email, created_at
, updated_at, comment,
photo, deleted_at, notify_parents, must_change_password, init_credential
) values( ', "'"  ,  
u.username , "','", m.nom, "','", m.prenom , "','", cre.credential, "','", m.sexe, "','", ifnull(m.date_naissance, '1900-01-01 00:00:00'), 
"',""", m.rue,""",'", m.numero, "','",m.boite,"','",m.code_postal,"',""", m.localite,""",'", m.num_tel, "','", m.num_mobile, "','", m.num_tel_priv, "','", m.matricule, "','"
, m.classt_h, "','", m.classt_d, "','",m.email, "','", ifnull(m.created_at, '1900-01-01 00:00:00'), "','"
, ifnull(m.updated_at, '1900-01-01 00:00:00'), "','", ifnull(m.comment,''), "','"
, ifnull(m.photo,''), "','", ifnull(m.deleted_at,'1900-01-01 00:00:00'), "',", ifnull(m.notify_parents,0), ",",1, ",", 1
 ,");"
) 
from wawa.users u
inner join wawa.credentials cre on cre.username= u.username
inner join wawa.membres m on m.username=u.username
where u.username!='guy';



/*
select concat(
'insert into auth_user (username, nom, prenom, password, sexe, date_naissance, rue, numero, boite, code_postal, localite, num_tel, num_mobile, num_tel_priv,
licence, classt_h, classt_d, email, created_at, updated_at, comment,
photo, deleted_at, notify_parents
) values( ', "'"  ,  
u.username , "','", m.nom, "','", m.prenom , "','", cre.credential, "','", m.sexe, "','", ifnull(m.date_naissance, '1900-01-01 00:00:00'), 
"',""", m.rue,""",'", m.numero, "','",m.boite,"','",m.code_postal,
"',""", m.localite,""",'", m.num_tel, "','", m.num_mobile, "','", m.num_tel_priv, "','", m.matricule, "','", m.classt_h, "','", m.classt_d, "','"
,m.email, "','", ifnull(m.created_at, '1900-01-01 00:00:00'), "','", ifnull(m.updated_at, '1900-01-01 00:00:00')
, "','", ifnull(m.comment,''), "','", ifnull(m.photo,''), "','", ifnull(m.deleted_at,'1900-01-01 00:00:00'), "',", ifnull(m.notify_parents,0)
 ,");"
) 
from wawa.users u
inner join wawa.credentials cre on cre.username= u.username
inner join wawa.membres m on m.username=u.username
where u.username!='guy';
*/
