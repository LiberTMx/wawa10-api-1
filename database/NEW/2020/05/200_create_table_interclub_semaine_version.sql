
create table interclubs_semaine_version
(
  id INT NOT NULL AUTO_INCREMENT ,
  semaine_id int not null,
  semaine_version int not null,
  semaine_version_statut varchar(20) not null,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;