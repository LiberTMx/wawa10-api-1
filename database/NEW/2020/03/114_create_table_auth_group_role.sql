CREATE  TABLE auth_group_role
(
  id INT NOT NULL AUTO_INCREMENT ,
  group_id int NOT NULL,
  role_id int NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_group_role 
	ADD UNIQUE INDEX auth_group_role_uix (group_id ASC, role_id asc);

