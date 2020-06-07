update auth_user
set licence=null where licence='NA';

update auth_user
set licence=null where licence='';

ALTER TABLE auth_user 
	ADD UNIQUE INDEX auth_user_licence_uix (licence asc);
    