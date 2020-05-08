CREATE  TABLE periode
(
  id INT NOT NULL AUTO_INCREMENT ,
  nom varchar(50) NOT NULL,
  description varchar(255),
  date_debut date not null,
  date_fin date not null,
  is_for_entrainements tinyint(1),
  is_for_stages tinyint(1),
  updated_at datetime DEFAULT NULL,
  updated_by varchar(50),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;
