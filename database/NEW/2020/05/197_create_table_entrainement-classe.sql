CREATE  TABLE entrainement_classe
(
  id INT NOT NULL AUTO_INCREMENT ,
  titre varchar(255) NOT NULL,
  presentation varchar(4000),
  updated_at datetime DEFAULT NULL,
  updated_by varchar(50),
  image_filename varchar(255),
  mime_type varchar(50),
  statut varchar(10),
  external_link varchar(500),
  show_order int,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

