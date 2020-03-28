CREATE  TABLE news
(
  id INT NOT NULL AUTO_INCREMENT ,
  titre varchar(255) NOT NULL,
  presentation varchar(4000),
  auteur_id int not null,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

