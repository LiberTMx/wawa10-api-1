CREATE  TABLE entrainement_groupe_seance
(
  id INT NOT NULL AUTO_INCREMENT ,
  titre varchar(100) NOT NULL,
  presentation varchar(250),
  updated_at datetime DEFAULT NULL,
  updated_by varchar(50),
  jour_index int not null,
  heure_debut varchar(10),
  heure_fin varchar(10),
  groupe_id int not null,
  classe_id int not null,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;
