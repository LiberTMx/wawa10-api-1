ALTER TABLE auth_user 
	ADD UNIQUE INDEX auth_user_username_uix (username ASC);

ALTER TABLE auth_user 
	ADD UNIQUE INDEX auth_user_nom_prenom_uix (nom ASC, prenom asc);    
