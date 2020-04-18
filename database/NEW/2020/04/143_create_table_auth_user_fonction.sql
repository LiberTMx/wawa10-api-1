CREATE  TABLE auth_user_fonction
(
  id INT NOT NULL AUTO_INCREMENT ,
  auth_user_id int not null,
  fonction_id int not null,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_user_fonction 
	ADD UNIQUE INDEX auth_user_fonction_uix (auth_user_id ASC, fonction_id asc);

ALTER TABLE auth_user_fonction 
ADD CONSTRAINT auth_user_fonction_u_fk
  FOREIGN KEY (auth_user_id)
  REFERENCES auth_user(id)
  ON DELETE CASCADE;   

ALTER TABLE auth_user_fonction 
ADD CONSTRAINT auth_user_fonction_f_fk
  FOREIGN KEY (fonction_id)
  REFERENCES auth_fonction(id)
  ON DELETE CASCADE;     