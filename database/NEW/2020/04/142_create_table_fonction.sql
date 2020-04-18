CREATE  TABLE auth_fonction
(
  id INT NOT NULL AUTO_INCREMENT ,
  code varchar(10),
  designation varchar(255),
  description varchar(255),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;