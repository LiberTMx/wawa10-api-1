create table interclub_semaine_version
(
  id INT NOT NULL AUTO_INCREMENT ,
  semaine_id int default null,
  semaine_version int default null,
  semaine_version_statut varchar(5),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;