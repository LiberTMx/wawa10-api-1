CREATE  TABLE parametre (
  id INT NOT NULL AUTO_INCREMENT ,
  param_key VARCHAR(60) NOT NULL ,
  param_value VARCHAR(100) NOT NULL ,
  param_type VARCHAR(100) NOT NULL ,
  param_format VARCHAR(100)  ,
  PRIMARY KEY (id) ,
  UNIQUE INDEX parametre_key_uix (param_key ASC) );