ALTER TABLE auth_user 
	ADD UNIQUE INDEX auth_user_username_uix (username asc);
    