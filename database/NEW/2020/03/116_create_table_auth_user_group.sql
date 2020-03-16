CREATE  TABLE auth_user_group
(
  id INT NOT NULL AUTO_INCREMENT ,
  user_id int NOT NULL,
  group_id int NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_user_group 
	ADD UNIQUE INDEX auth_user_group_uix (group_id ASC, user_id asc);

