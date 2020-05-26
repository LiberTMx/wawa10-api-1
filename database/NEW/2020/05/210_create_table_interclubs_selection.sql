CREATE  TABLE interclubs_selection
(
  id INT NOT NULL AUTO_INCREMENT ,
  interclubs_match_id varchar(250) not null,
  auth_user_id int not null,
  interclubs_semaine_version_id int not null,
  position int not null,
  classement varchar(20) not null,
  ranking_index int not null,
  joueur_confirmation varchar (25),
  joueur_commentaire varchar (250),
  updated_at TIMESTAMP,
  updated_by int not null,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;
