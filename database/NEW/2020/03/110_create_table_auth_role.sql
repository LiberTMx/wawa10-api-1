CREATE  TABLE auth_role
(
  id INT NOT NULL AUTO_INCREMENT ,
  domain_id int NOT NULL,
  role varchar(255) NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_role 
	ADD UNIQUE INDEX auth_role_domain_uix (domain_id ASC, role asc);

ALTER TABLE auth_role 
  ADD CONSTRAINT auth_role_domain_fk FOREIGN KEY (domain_id) REFERENCES auth_domain (id);