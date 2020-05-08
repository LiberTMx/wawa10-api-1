CREATE  TABLE entrainement_classe_groupe
(
  id INT NOT NULL AUTO_INCREMENT ,
  classe_id int not null,
  titre varchar(255) NOT NULL,
  presentation varchar(4000),
  updated_at datetime DEFAULT NULL,
  updated_by varchar(50),
  image_filename varchar(255),
  mime_type varchar(50),
  statut varchar(10),
  external_link varchar(500),
  show_order int,
  limite_age varchar(250),
  limite_classement varchar(250),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

