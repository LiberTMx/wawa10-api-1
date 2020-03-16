CREATE  TABLE auth_domain
(
  id INT NOT NULL AUTO_INCREMENT ,
  domain varchar(255) NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE auth_domain 
	ADD UNIQUE INDEX auth_domain_uix (domain ASC);