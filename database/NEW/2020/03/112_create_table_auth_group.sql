CREATE  TABLE auth_group
(
  id INT NOT NULL AUTO_INCREMENT ,
  group_ varchar(255) NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_group
	ADD UNIQUE INDEX auth_group_uix (group_ ASC);