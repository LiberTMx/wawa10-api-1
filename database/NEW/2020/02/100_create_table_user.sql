CREATE  TABLE auth_user
(
  id INT NOT NULL AUTO_INCREMENT ,
  username varchar(255) NOT NULL,
  nom varchar(255) DEFAULT NULL,
  prenom varchar(255) DEFAULT NULL,
  sexe varchar(1) DEFAULT NULL,
  date_naissance datetime DEFAULT NULL,
  rue varchar(255) DEFAULT NULL,
  numero varchar(255) DEFAULT NULL,
  boite varchar(255) DEFAULT NULL,
  code_postal varchar(255) DEFAULT NULL,
  localite varchar(255) DEFAULT NULL,
  num_tel varchar(255) DEFAULT NULL,
  num_tel_priv varchar(255) DEFAULT NULL,
  num_mobile varchar(255) DEFAULT NULL,
  licence varchar(255) DEFAULT NULL,
  classt_h varchar(255) DEFAULT NULL,
  classt_d varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  comment text,
  photo varchar(255) DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  notify_parents tinyint(1) DEFAULT '0',
  password varchar(255),
  must_change_password tinyint(1),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;